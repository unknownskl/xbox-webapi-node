const HttpClient = require('../http.js')
const BaseProvider = require('./base.js')
const Debug = require('debug')('xbox-webapi-node:provider_userstats')

module.exports = function (client) {
    var provider = BaseProvider(client)
    provider._endpoint = 'https://userstats.xboxlive.com'

    provider._headers['x-xbl-contract-version'] = 2

    provider.getUserTitleStats = function (titleId) {
        Debug('getUserTitleStats(' + titleId + ')')

        return this.post(
            '/batch',
            `{"arrangebyfield":"xuid","xuids":["${this._client._authentication._user.xid}"],"groups":[{"name":"Hero","titleId":"${titleId}"}],"stats":[{"name":"MinutesPlayed","titleId":"${titleId}"}]}`
        )
    }

    return provider
}