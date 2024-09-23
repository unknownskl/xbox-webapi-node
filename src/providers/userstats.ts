import BaseProvider from './base'
const Debug = require('debug')('xbox-webapi-node:provider_userstats')

export default class PeopleProvider extends BaseProvider {
    _endpoint = 'https://userstats.xboxlive.com'
    _headers = {
        'x-xbl-contract-version': '2',
    }

    getUserTitleStats(titleId:string) {
        Debug('getUserTitleStats(' + titleId + ')')

        return this.post(
            '/batch',
            `{"arrangebyfield":"xuid","xuids":["${this._client._authentication._user?.xid}"],"groups":[{"name":"Hero","titleId":"${titleId}"}],"stats":[{"name":"MinutesPlayed","titleId":"${titleId}"}]}`
        )
    }
}