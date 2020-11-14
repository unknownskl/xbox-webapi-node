const BaseProvider = require('./base.js')
const Debug = require('debug')('xbox-webapi-node:provider_messages')

module.exports = function(client){

    var provider = BaseProvider(client)
    provider._endpoint = 'https://xblmessaging.xboxlive.com'

    // provider._headers['x-xbl-contract-version'] = 2

    provider.getInbox = function(){
        Debug('getInbox()')

        // return this.get('/users/xuid('+this._client._authentication._user.xid +')/profile/settings?settings=GameDisplayName,GameDisplayPicRaw,Gamerscore,Gamertag')
        return this.get('/network/Xbox/users/me/inbox')
        
    }

    return provider
}