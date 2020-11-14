const BaseProvider = require('./base.js')
const Debug = require('debug')('xbox-webapi-node:provider_profile')

module.exports = function(client){

    var provider = BaseProvider(client)
    provider._endpoint = 'https://profile.xboxlive.com'

    provider._headers['x-xbl-contract-version'] = 3

    provider.getUserProfile = function(){
        Debug('getUserProfile()')

        return this.get('/users/xuid('+this._client._authentication._user.xid +')/profile/settings?settings=GameDisplayName,GameDisplayPicRaw,Gamerscore,Gamertag')
    }

    return provider
}