const QueryString = require('querystring')
const Debug = require('debug')('xbox-webapi-node:authentication')

const HttpClient = require('./http')

const Https = require('https')

var express = require('express')

module.exports = function(clientId, secret){

    return {
        _clientId: clientId,
        _clientSecret: secret,
        _scopes: ['XboxLive.signin', 'XboxLive.offline_access'],

        _express: false,

        _tokens: {
            oauth: {},
            user: {},
            xsts: {}
        },

        _endpoints: {
            live: 'https://login.live.com',
            auth: 'https://user.auth.xboxlive.com'
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

        startServer: function(port){
            if(port === undefined)
                port = 8080
            
            var app = express()

            app.get('/auth/callback', function(req, res) {
                this.getTokenRequest(req.query.code, function(data, error){
                    if(error){
                        res.send('Failed to login. Please check the console output')
                    } else {
                        res.send('Login succeeded!')
                        Debug('[AUTH] Got oauth token:', data)

                        this._tokens.oauth = data

                        this.refreshTokens()
                    }
                }.bind(this))
                
            }.bind(this))

            app.listen(port, function () {
                Debug('[HTTP] Authentication server ready on :'+port)
                Debug('Authorization URL: ', this.generateAuthorizationUrl())
            }.bind(this))

            this._express = app
        },

        refreshTokens: function(){
            Debug('[AUTH] Tokens in memory: ', this._tokens.oauth)
            
            this.getUserToken(this._tokens.oauth.access_token, function(data, error){
                console.log(data, error)
            }.bind(this))
        },

        getTokenRequest: function(code, callback){

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
                callback(JSON.parse(data))
            }).catch(function(error){
                callback(false, error)
            })
        },

        refreshToken: function(refreshToken, callback){

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
                callback(JSON.parse(data))
            }).catch(function(error){
                callback(false, error)
            })
        },

        getUserToken: function(accessToken, callback){

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
                callback(JSON.parse(data))
            }).catch(function(error){
                callback(false, error)
            })
        }
    }
}