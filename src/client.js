var Authentication = require('../src/authentication.js')
var TokenStore = require('../src/tokenstore.js')

module.exports = function(tokens = {})
{
    var apiClient = {
        tokens: tokens,
        is_token_store: false,

        auth_manager: false,

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
        }
    }

    return apiClient.startup()
}
