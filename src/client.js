var Authentication = require('./authentication.js')

var UserPresenceProvider = require('./providers/userpresence.js')
var TitlehubProvider = require('./providers/titlehub.js')
var AchievementsProvider = require('./providers/achievements.js')
var GameserverProvider = require('./providers/gameserver.js')
var SocialProvider = require('./providers/social.js')
var ProfileProvider = require('./providers/profile.js')
var InventoryProvider = require('./providers/inventory.js')
var PinsProvider = require('./providers/pins.js')
var MessagesProvider = require('./providers/messages.js')

module.exports = function(tokens = {})
{
    var apiClient = {
        tokens: tokens,
        is_token_store: false,

        auth_manager: false,

        providers: {
            userpresence: UserPresenceProvider,
            titlehub: TitlehubProvider,
            achievements: AchievementsProvider,
            gameserver: GameserverProvider,
            social: SocialProvider,
            profile: ProfileProvider,
            inventory: InventoryProvider,
            pins: PinsProvider,
            messages: MessagesProvider
        },

        startup: function(){
            this.auth_manager = Authentication()

            if(this.tokens.tokens != undefined){
                // Object is a TokenStore
                this.tokens.load()
                this.is_token_store = true
                this.auth_manager.setTokens(this.tokens.tokens)
            } else {
                this.auth_manager.setTokens(this.tokens)
            }

            return this
        },

        authenticate: function(){
            return new Promise(function(resolve, reject) {
                this.auth_manager.authenticate().then(function(user_data){

                    // Save new tokens after auth
                    if(this.is_token_store){
                        this.tokens.set('xsts_token', this.auth_manager.xsts_token)
                        this.tokens.set('user_token', this.auth_manager.user_token)

                        this.tokens.save()
                    }
                    resolve(user_data)

                }.bind(this)).catch(function(error){
                    reject(error)
                })
            }.bind(this))
        },

        provider: function(name){
            if(this.providers[name] != undefined){
                return this.providers[name](this)
            } else {
                return false
            }
        },

        get_http_headers: function(){
            return {
                Authorization: 'XBL3.0 x='+this.auth_manager.xsts_token.DisplayClaims.xui[0].uhs+';'+this.auth_manager.xsts_token.Token,
                'Accept-Language': 'en-US',
                'x-xbl-contract-version': '2',
                'x-xbl-client-name': 'XboxApp',
                'x-xbl-client-type': 'UWA',
                'x-xbl-client-version': '39.39.22001.0'
            }
        },

        check_http_response: function(error, res, body, resolve, reject){
            if(res.statusCode == 400){
                reject({
                    error: 'response.failed',
                    message: 'Token is invalid',
                    details: {
                        response_status: res.statusCode,
                        method: res.request.method,
                        url: res.request.href,
                        body: res.request.body,
                        res: res
                    }
                })
            } else if(res.statusCode == 403){
                reject({
                    error: 'response.forbidden',
                    message: 'Server send a forbidden response',
                    details: {
                        response_status: res.statusCode,
                        method: res.request.method,
                        url: res.request.href,
                        body: res.request.body,
                        res: res
                    }
                })
            } else if(res.statusCode == 404){
                reject({
                    error: 'response.not_found',
                    message: 'Send returned a 404 error',
                    details: {
                        response_status: res.statusCode,
                        method: res.request.method,
                        url: res.request.href,
                        body: res.request.body,
                        res: res
                    }
                })
            } else if(res.statusCode == 500){
                reject({
                    error: 'response.server_error',
                    message: 'Server error encountered',
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
                    error: 'response.response.body_null',
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
                if(typeof body === 'object'){
                    resolve(body)
                } else {
                    console.log('body:', res.statusCode)
                    resolve(JSON.parse(body))
                }
            }
        }
    }

    return apiClient.startup()
}
