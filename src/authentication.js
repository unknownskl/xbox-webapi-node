const QueryString = require('querystring')
const Debug = require('debug')('xbox-webapi-node:authentication')

const HttpClient = require('./http.js')
var fs = require('fs')

var express = require('express')

module.exports = function(clientId, secret){

    return {
        _clientId: clientId,
        _clientSecret: secret,
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
                    console.log('OAUTH Error:', error)
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

        refreshTokens: function(){
            // @TODO: Refactor this part so we check the timestamps and improve the renewall flow so long running processes can renew tokens too
            return new Promise(function(resolve, reject) {

                if(this._tokens.user.Token === undefined){
                    this.getUserToken(this._tokens.oauth.access_token).then(function(data){
                        this._tokens.user = data



                        
                        if(this._tokens.xsts.Token === undefined){
                            // console.log('GETTING XSTS TOKEN', this._tokens.user)
                            this.getXstsToken(this._tokens.user.Token).then(function(data){
                                this._tokens.xsts = data

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
                        } else {
                            resolve()
                        }




                    }.bind(this)).catch(function(error){
                        reject(error)
                    }.bind(this))

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
                    resolve(JSON.parse(data))
                }).catch(function(error){
                    reject(error)
                })
            }.bind(this))
        },

        refreshToken: function(refreshToken, callback){
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
                    resolve(JSON.parse(data))
                }).catch(function(error){
                    reject(error)
                })
            }.bind(this))
        },

        getUserToken: function(accessToken, callback){
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
                    resolve(JSON.parse(data))
                }).catch(function(error){
                    reject(error)
                })
            }.bind(this))
        },

        getXstsToken: function(userToken, callback){
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
                    resolve(JSON.parse(data))
                }).catch(function(error){
                    reject(error)
                })
            }.bind(this))
        },

        isAuthenticated: function(){
            return new Promise(function(resolve, reject) {
                if (fs.existsSync(this._tokensFile)){
                    this.loadTokens()
                }

                if(this._tokens.oauth.refresh_token){
                    this.refreshToken(this._tokens.oauth.refresh_token).then(function(token){

                        if(this._tokens.xsts.access_token === undefined){
                            this.refreshTokens().then(function(token){
                                resolve(token)
                            }).catch(function(error){
                                reject(error)
                            })
                        } else {
                            resolve(token)
                        }

                    }.bind(this)).catch(function(error){
                        reject(error)

                    }.bind(this))
                } else {
                    reject('No refresh token in .token.json')
                }
            }.bind(this))
        },

        saveTokens: function(){
            return fs.writeFileSync(this._tokensFile, JSON.stringify(this._tokens.oauth))
        },

        loadTokens: function(){
            var token_store = fs.readFileSync(this._tokensFile).toString()
            this._tokens.oauth = JSON.parse(token_store)
        }
    }
}