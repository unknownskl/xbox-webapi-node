const BaseProvider = require('./base.js')
const Debug = require('debug')('xbox-webapi-node:provider_messages')

module.exports = function(client){

    var provider = BaseProvider(client)
    provider._endpoint = 'https://xblmessaging.xboxlive.com'

    provider.getInbox = function(){
        Debug('getInbox()')

        return this.get('/network/Xbox/users/me/inbox')
        
    }

    provider.getConversation = function(xuid){
        Debug('getConversation('+xuid+')')

        return this.get('/network/Xbox/users/me/conversations/users/xuid('+xuid+')?maxItems=100')
    }

    return provider
}