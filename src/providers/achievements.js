const HttpClient = require('../http.js')
const BaseProvider = require('./base.js')
const Debug = require('debug')('xbox-webapi-node:provider_achievements')

module.exports = function(client){

    var provider = BaseProvider(client)
    provider._endpoint = 'https://achievements.xboxlive.com'

    provider._headers['x-xbl-contract-version'] = 2

    provider.getTitleAchievements = function(continuationToken = 0){
        Debug('getRecentAchievements('+continuationToken+')')

        return this.get('/users/xuid('+this._client._authentication._user.xid +')/history/titles?continuationToken='+continuationToken)
    }

    provider.getTitleAchievements360 = function(continuationToken = 0){
        Debug('getRecentAchievements360('+continuationToken+')')
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