import BaseProvider from './base'
const Debug = require('debug')('xbox-webapi-node:provider_achievements')

export default class AchievementsProvider extends BaseProvider {
    _endpoint = 'https://achievements.xboxlive.com'
    _headers = {
        'x-xbl-contract-version': '2'
    }

    getTitleAchievements(continuationToken = 0){
        Debug('getRecentAchievements('+continuationToken+')')

        return this.get('/users/xuid('+this._client._authentication?._user?.xid +')/history/titles?continuationToken='+continuationToken)
    }

    getTitleAchievements360(continuationToken = 0){
        Debug('getRecentAchievements360('+continuationToken+')')
        this._headers['x-xbl-contract-version'] = '1'

        return this.get('/users/xuid('+this._client._authentication?._user?.xid +')/history/titles')
    }

    getTitleId(titleId:string, continuationToken = 0){
        Debug('getTitleId(titleId)')

        return this.get('/users/xuid('+this._client._authentication?._user?.xid +')/achievements?titleId='+titleId+'&continuationToken='+continuationToken)
    }

    getTitleId360(titleId:string, continuationToken = 0){
        Debug('getTitleId(titleId)')
        this._headers['x-xbl-contract-version'] = '1'

        return this.get('/users/xuid('+this._client._authentication?._user?.xid +')/achievements?titleId='+titleId+'&continuationToken='+continuationToken)
    }
}