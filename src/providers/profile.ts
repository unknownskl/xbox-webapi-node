import BaseProvider from './base'

const Debug = require('debug')('xbox-webapi-node:provider_profile')

// module.exports = function(client){

export default class ProfileProvider extends BaseProvider {
    _endpoint = 'https://profile.xboxlive.com'
    _headers = {
        'x-xbl-contract-version': '3'
    }

    getUserProfile() {
        Debug('getUserProfile()')

        return this.get('/users/xuid('+this._client?._authentication?._user?.xid +')/profile/settings?settings=GameDisplayName,GameDisplayPicRaw,Gamerscore,Gamertag')
    }
}