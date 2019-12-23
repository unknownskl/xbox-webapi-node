const querystring = require('querystring')
const request = require('request')

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
        user_token: false,
        user_id: false,

        authenticated: false,

        setUserAuth: function(email, password){
            this.email_address = email
            this.password = password
        },

        authenticate: function(){
            return new Promise(function(resolve, reject) {

                // Authentication via credentials
                if(this.email_address != false && this.password !=  false){
                    //  @TODO: Generate url flow

                    var url = this._generate_authorization_url()
                    console.log('Authenticate using:', url)

                }

                if(this.access_token != false && this.refresh_token != false){
                    this._get_user_token(this.access_token).then(function(user_token){
                        console.log('token:', user_token)
                        console.log('user_token', user_token.DisplayClaims.xui)

                        this.user_token = user_token

                        // Lets get the XSTS token
                        this._get_xsts_token(this.user_token.Token).then(function(xsts_token){

                            console.log('xsts_token', xsts_token)
                            console.log('User authenticated:', xsts_token.DisplayClaims.xui[0].gtg)

                            this.authenticated = true

                            resolve('ok')

                        }.bind(this)).catch(function(error){
                            reject(error)
                        })
                    }.bind(this)).catch(function(error){
                        reject(error)
                    })
                } else {
                    reject('Failed to authenticate. Run with token')
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
                    if (error) {
                        reject(error)
                    }
                    resolve(body)
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
                    if (error) {
                        reject(error)
                    }
                    resolve(body)
                })
            }.bind(this))
        }
    }
}
