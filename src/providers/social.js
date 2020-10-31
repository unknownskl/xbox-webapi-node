const HttpClient = require('../http.js')
const BaseProvider = require('./base.js')
const Debug = require('debug')('xbox-webapi-node:provider_social')

module.exports = function(client){

    var provider = BaseProvider(client)
    provider._endpoint = 'https://social.xboxlive.com'

    // provider._headers['x-xbl-contract-version'] = 3

    // provider.getProfiles = function(){
    //     Debug('getUserProfile()')

    //     return this.get('/users/xuid('+this._client._authentication._user.xid +')/profile/settings?settings=GameDisplayName,GameDisplayPicRaw,Gamerscore,Gamertag')
    // }

    return provider
}