const HttpClient = require('../http.js')
const BaseProvider = require('./base.js')
const Debug = require('debug')('xbox-webapi-node:provider_profile')

module.exports = function(client){

    var provider = BaseProvider(client)
    provider._endpoint = 'https://achievements.xboxlive.com'

    provider._headers['x-xbl-contract-version'] = 2

    provider.getRecentAchievements = function(){
        Debug('getRecentAchievements()')

        return this.get('/users/xuid('+this._client._authentication._user.xid +')/history/titles')
    }

    provider.getRecentAchievements360 = function(){
        Debug('getRecentAchievements360()')
        this._headers['x-xbl-contract-version'] = 1

        return this.get('/users/xuid('+this._client._authentication._user.xid +')/history/titles')
    }

    provider.getTitleId = function(titleId){
        Debug('getTitleId(titleId)')

        return this.get('/users/xuid('+this._client._authentication._user.xid +')/achievements?titleId='+titleId)
    }

    provider.getTitleId360 = function(titleId){
        Debug('getTitleId(titleId)')
        this._headers['x-xbl-contract-version'] = 1

        return this.get('/users/xuid('+this._client._authentication._user.xid +')/achievements?titleId='+titleId)
    }

    return provider
}