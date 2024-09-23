// @ts-nocheck
const QueryString = require('querystring')
const Debug = require('debug')('xbox-webapi-node:authentication')

const HttpClient = require('./http.js')
var fs = require('fs')

var express = require('express')

module.exports = function(clientId, secret, userToken, uhs){

    return {
        _clientId: clientId,
        _clientSecret: secret,
        _userToken: userToken,
        _uhs: uhs,
        _scopes: ['XboxLive.signin', 'XboxLive.offline_access'],

        _express: false,
        _expressServer: false,
        _tokensFile: '.tokens.json',

        _tokens: {
            oauth: {},
            user: {},
            xsts: {}
        },
        _user: false,

        _endpoints: {
            live: 'https://login.live.com',
            auth: 'https://user.auth.xboxlive.com',
            xsts: 'https://xsts.auth.xboxlive.com'
        },

        generateAuthorizationUrl: function(){
            var params_object = {
                "client_id": this._clientId,
                "response_type": "code",
                "approval_prompt": "auto",
                "scope": this._scopes.join(' '),
                "redirect_uri": this.getReturnUrl(),
            }
            var params = QueryString.stringify(params_object)
            return 'https://login.live.com/oauth20_authorize.srf?'+params
        },

        getReturnUrl: function(){
            // @TODO: Get port from express
            return 'http://localhost:8080/auth/callback'
        },

        startServer: function(callback, port){
            if(port === undefined)
                port = 8080
            
            var app = express()

            app.get('/auth/callback', function(req, res) {
                this.getTokenRequest(req.query.code).then(function(data){
                    res.send('Login succeeded!')
                    Debug('[AUTH] Got oauth token:', data)

                    this._tokens.oauth = data
                    this.saveTokens()

                    callback(data)
                    this.stopServer()

                }.bind(this)).catch(function(error){
                    // console.log('OAUTH Error:', error)
                    res.send('Failed to login. Please check the console output')
                })
                
            }.bind(this))

            var server = app.listen(port, function () {
                Debug('[HTTP] Authentication server ready on :'+port)
                Debug('Authorization URL: ', this.generateAuthorizationUrl())
            }.bind(this))

            this._express = app
            this._expressServer = server
        },

        stopServer: function(){
            return this._expressServer.close()
        },

        refreshTokens: function(type){
            if(type == undefined){
                type = 'oauth'
            }

            Debug('refreshTokens('+type+')')

            return new Promise(function(resolve, reject) {
                if(type == 'oauth'){
                    if(this._tokens.oauth.refresh_token){
                        this.refreshTokens('user').then(function(){
                            resolve()
                        }).catch(function(error){
                            reject(error)
                        })
                    } else {
                        reject('No oauth token found. Run authentication flow first')
                    }

                } else if(type == 'user'){

                    if(this._tokens.user.Token){
                        var user_expire_user = new Date(this._tokens.user.NotAfter).getTime()
                        
                        if(new Date() > user_expire_user){
                            // Oauth token expired, refresh user token
                            // console.log('TODO: refresh user token')

                            this.refreshToken(this._tokens.oauth.refresh_token).then(function(user_token){
                                Debug('refreshTokens('+type+') Get token,', user_token)

                                this._tokens.oauth = user_token
                                this.saveTokens()

                                this.getUserToken(this._tokens.oauth.access_token).then(function(token){
                                    this._tokens.user = token
                                    this._tokens.xsts = {}
                                    // this._tokens.xsts = false // Force xsts refresh
                                    this.saveTokens()

                                    this.refreshTokens('xsts').then(function(){
                                        resolve()
                                    }).catch(function(error){
                                        reject(error)
                                    })

                                }.bind(this)).catch(function(error){
                                    reject('Unable to refresh oauth access token. Reauthenticate again')
                                })
                            }.bind(this)).catch(function(error){
                                reject('Unable to refresh user access token. Reauthenticate again')
                            })
                        } else {
                            // Token is still valid
                            // console.log('user token is valid')

                            this.refreshTokens('xsts').then(function(){
                                resolve()
                            }).catch(function(error){
                                reject(error)
                            })
                        }
                    } else {
                        // Get user token
                        this.getUserToken(this._tokens.oauth.access_token).then(function(data){
                            // Got user token, continue with xsts
                            this._tokens.user = data
                            this._tokens.xsts = {}
                            // this._tokens.xsts = false // Force xsts refresh
                            this.saveTokens()

                            this.refreshTokens('xsts').then(function(){
                                resolve()
                            }).catch(function(error){
                                reject(error)
                            })

                        }.bind(this)).catch(function(error){
                            reject(error)
                        })
                    }

                } else if(type == 'xsts'){
                    // console.log(this._tokens)

                    if(this._tokens.xsts.Token){
                        Debug('refreshTokens('+type+') Has token')
                        var oauth_expire = new Date(this._tokens.xsts.NotAfter).getTime()
                        
                        if(new Date() > oauth_expire){
                            Debug('refreshTokens('+type+') Token is expired, refreshing token')
                            // Oauth token expired, refresh user token
                            // console.log('TODO: refresh xsts token')

                            this._tokens.xsts = {}
                            this.saveTokens()

                            this.getXstsToken(this._tokens.user.Token).then(function(token){
                                this._tokens.xsts = token
                                this.saveTokens()
                                Debug('refreshTokens('+type+') Token refresh succes')

                                this.refreshTokens('xsts').then(function(){
                                    Debug('refreshTokens('+type+') Token xsts flow ok')
                                    resolve()
                                }).catch(function(error){
                                    Debug('refreshTokens('+type+') Token xsts flow failed')
                                    reject(error)
                                })

                            }.bind(this)).catch(function(error){
                                // @TODO: Investigate this part  of the auth flow
                                Debug('refreshTokens('+type+') Token refresh failed:', error)

                                reject('Unable to refresh xsts access token. Reauthenticate again', error)
                            }.bind(this))
                        } else {
                            Debug('refreshTokens('+type+') Token is valid')
                            // Token is still valid
                            // console.log('xsts token is valid')

                            this._user = {
                                gamertag: this._tokens.xsts.DisplayClaims.xui[0].gtg,
                                xid: this._tokens.xsts.DisplayClaims.xui[0].xid,
                                uhs: this._tokens.xsts.DisplayClaims.xui[0].uhs
                                // @TODO: Check if we need more data?
                            }

                            resolve()
                        }
                    } else {
                        Debug('refreshTokens('+type+') Token not set, get token')
                        // Get user token
                        this.getXstsToken(this._tokens.user.Token).then(function(data){
                            // Got user token, continue with xsts
                            this._tokens.xsts = data
                            this.saveTokens()
                            // console.log(this._tokens)

                            this._user = {
                                gamertag: data.DisplayClaims.xui[0].gtg,
                                xid: data.DisplayClaims.xui[0].xid,
                                uhs: data.DisplayClaims.xui[0].uhs
                                // @TODO: Check if we need more data?
                            }

                            resolve()

                        }.bind(this)).catch(function(error){
                            reject(error)
                        }.bind(this))
                    }
                }
            }.bind(this))
        },

        getTokenRequest: function(code, callback){
            return new Promise(function(resolve, reject) {
                const tokenParams = {
                    "client_id": this._clientId,
                    "grant_type": "authorization_code",
                    "scope": this._scopes.join(' '),
                    "code": code,
                    "redirect_uri": this.getReturnUrl()
                }

                if(this._clientSecret !== '')
                    tokenParams.client_secret = this._clientSecret

                var postData = QueryString.stringify(tokenParams)

                HttpClient().post(this._endpoints.live+'/oauth20_token.srf', {'Content-Type': 'application/x-www-form-urlencoded'}, postData).then(function(data){
                    var responseData = JSON.parse(data)
                    responseData.issued = new Date().toISOString()
                    
                    resolve(responseData)
                }).catch(function(error){
                    reject(error)
                })
            }.bind(this))
        },

        refreshToken: function(refreshToken){
            Debug('refreshToken()')
            return new Promise(function(resolve, reject) {
                const tokenParams = {
                    "client_id": this._clientId,
                    "grant_type": "refresh_token",
                    "scope": this._scopes.join(' '),
                    "refresh_token": refreshToken,
                }

                if(this._clientSecret !== '')
                    tokenParams.client_secret = this._clientSecret

                var postData = QueryString.stringify(tokenParams)

                HttpClient().post(this._endpoints.live+'/oauth20_token.srf', {'Content-Type': 'application/x-www-form-urlencoded'}, postData).then(function(data){
                    var responseData = JSON.parse(data)
                    responseData.issued = new Date().toISOString()
                    
                    Debug('refreshToken() Resolved')
                    resolve(responseData)
                }).catch(function(error){
                    Debug('refreshToken() Rejected', error)
                    reject(error)
                })
            }.bind(this))
        },

        getUserToken: function(accessToken){
            Debug('getUserToken()')
            return new Promise(function(resolve, reject) {
                const tokenParams = {
                    "RelyingParty": "http://auth.xboxlive.com",
                    "TokenType": "JWT",
                    "Properties": {
                        "AuthMethod": "RPS",
                        "SiteName": "user.auth.xboxlive.com",
                        "RpsTicket": "d="+accessToken
                    },
                }

                const postData = JSON.stringify(tokenParams)

                HttpClient().post(this._endpoints.auth+'/user/authenticate', {'Content-Type': 'application/json'}, postData).then(function(data){
                    var responseData = JSON.parse(data)
                    // responseData.issued = new Date().toISOString()
                    
                    Debug('getUserToken() Resolved')
                    resolve(responseData)
                }).catch(function(error){
                    Debug('getUserToken() Rejected', error)
                    reject(error)
                })
            }.bind(this))
        },

        getXstsToken: function(userToken){
            Debug('getXstsToken()')
            return new Promise(function(resolve, reject) {
                const tokenParams = {
                    "RelyingParty": "http://xboxlive.com",
                    "TokenType": "JWT",
                    "Properties": {
                        "UserTokens": [userToken],
                        "SandboxId": "RETAIL",
                    },
                }

                const postData = JSON.stringify(tokenParams)

                HttpClient().post(this._endpoints.xsts+'/xsts/authorize', {'Content-Type': 'application/json', 'x-xbl-contract-version': '1'}, postData).then(function(data){
                    Debug('getXstsToken() Resolved')
                    resolve(JSON.parse(data))
                }).catch(function(error){
                    Debug('getXstsToken() Rejected')
                    reject(error)
                })
            }.bind(this))
        },

        isAuthenticated: function(){
            Debug('isAuthenticated()')
            return new Promise(function(resolve, reject) {
                if (fs.existsSync(this._tokensFile)){
                    this.loadTokens()
                }

                if(this._clientId !== ''){
                    this.refreshTokens().then(function(){
                        resolve()
                    }).catch(function(error){
                        reject(error)
                    })
                } else if(this._userToken !== '' && this._uhs !== ''){
                    resolve()
                } else {
                    reject({ error: 'No authentication supplied.' })
                }
            }.bind(this))
        },

        saveTokens: function(){
            return fs.writeFileSync(this._tokensFile, JSON.stringify(this._tokens))
        },

        loadTokens: function(){
            var token_store = fs.readFileSync(this._tokensFile).toString()
            this._tokens = JSON.parse(token_store)
        }
    }
}