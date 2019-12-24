const querystring = require('querystring')
const request = require('request')

// const Error = require('./error.js')

module.exports = function()
{
    // var id = Math.floor(Math.random() * (999 - 1)) + 1;
    // var Debug = require('debug')('smartglass:client-'+id)
    //
    // var events = Events()

    return {
        email_address: false,
        password: false,

        access_token: false,
        refresh_token: false,
        xsts_token: false,
        user_token: false,
        user_id: false,

        authenticated: false,

        setUserAuth: function(email, password){
            this.email_address = email
            this.password = password
        },

        setTokens: function(tokens){
            if(tokens.access_token != undefined)
                this.access_token = tokens.access_token

            if(tokens.refresh_token != undefined)
                this.refresh_token = tokens.refresh_token

            if(tokens.xsts_token != undefined)
                this.xsts_token = tokens.xsts_token

            if(tokens.user_token != undefined)
                this.user_token = tokens.user_token

            if(tokens.user_id != undefined)
                this.user_id = tokens.user_id
        },

        authenticate: function(){
            return new Promise(function(resolve, reject) {
                // Run login using xsts token (Layer 1)
                // @TODO: Run query to test token?

                // Run login using user_token (Layer 2)
                if(this.user_token != false){
                    this._get_xsts_token(this.user_token.Token).then(function(xsts_token){

                        this.xsts_token = xsts_token
                        this.authenticated = true

                        resolve(xsts_token.DisplayClaims.xui[0])

                    }.bind(this)).catch(function(error){
                        reject(error)
                    })
                } else if(this.access_token != false && this.refresh_token != false){
                    // Run login using access and refresh token (Layer 3)
                    this._get_user_token(this.access_token).then(function(user_token){
                        this.user_token = user_token

                        // Lets get the XSTS token
                        this._get_xsts_token(this.user_token.Token).then(function(xsts_token){
                            this.xsts_token = xsts_token
                            this.authenticated = true
                            
                            resolve(xsts_token.DisplayClaims.xui[0])

                        }.bind(this)).catch(function(error){
                            reject(error)
                        })
                    }.bind(this)).catch(function(error){
                        reject(error)
                    })
                } else {

                    // Authentication via credentials
                    if(this.email_address != false && this.password !=  false){
                        //  @TODO: Generate url flow

                        var url = this._generate_authorization_url()
                        //console.log('Authenticate using:', url)

                        reject({
                            error: 'authentication.need_setup',
                            message: 'Need setup: '+url,
                            details: {
                                url: url
                            }
                        })
                    }
                }

            }.bind(this))
        },

        _generate_authorization_url: function(){
            var response_type='token'
            var client_id='0000000048093EE3'
            var scope='service::user.auth.xboxlive.com::MBI_SSL'
            var redirect_uri='https://login.live.com/oauth20_desktop.srf'

            var params = querystring.stringify({
                client_id: client_id,
                redirect_uri: redirect_uri,
                response_type: response_type,
                display: 'touch',
                scope: scope,
                locale: 'en'
            })

            return 'https://login.live.com/oauth20_authorize.srf?'+params;
        },

        _get_user_token: function(access_token){
            return new Promise(function(resolve, reject) {
                request.post('https://user.auth.xboxlive.com/user/authenticate', {
                  json: {
                        "RelyingParty": "http://auth.xboxlive.com",
                        "TokenType": "JWT",
                        "Properties": {
                            "AuthMethod": "RPS",
                            "SiteName": "user.auth.xboxlive.com",
                            "RpsTicket": access_token,
                        }
                    }
                }, (error, res, body) => {
                    if(res.statusCode == 400){
                        reject({
                            error: 'authentication.failed',
                            message: 'Token is invalid',
                            details: {
                                response_status: res.statusCode,
                                method: res.request.method,
                                url: res.request.href,
                                body: res.request.body,
                                res: res
                            }
                        })
                    } else if(body == undefined){
                        reject({
                            error: 'authentication.response.body_null',
                            message: 'Web api responded without a body, status: '+res.statusCode,
                            details: {
                                response_status: res.statusCode,
                                method: res.request.method,
                                url: res.request.href,
                                body: res.request.body,
                                res: res
                            }
                        })
                    } else {
                        resolve(body)
                    }
                })
            }.bind(this))
        },

        _get_xsts_token: function(user_token){
            return new Promise(function(resolve, reject) {
                request.post('https://xsts.auth.xboxlive.com/xsts/authorize', {
                  json: {
                        "RelyingParty": "http://xboxlive.com",
                        "TokenType": "JWT",
                        "Properties": {
                            "UserTokens": [user_token],
                            "SandboxId": "RETAIL",
                        }
                    }
                }, (error, res, body) => {
                    if(res.statusCode == 400){
                        reject({
                            error: 'authentication.failed',
                            message: 'Token is invalid',
                            details: {
                                response_status: res.statusCode,
                                method: res.request.method,
                                url: res.request.href,
                                body: res.request.body,
                                res: res
                            }
                        })
                    } else if(body == undefined){
                        reject({
                            error: 'authentication.response.body_null',
                            message: 'Web api responded without a body, status: '+res.statusCode,
                            details: {
                                response_status: res.statusCode,
                                method: res.request.method,
                                url: res.request.href,
                                body: res.request.body,
                                res: res
                            }
                        })
                    } else {
                        resolve(body)
                    }
                })
            }.bind(this))
        }
    }
}
