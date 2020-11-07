const HttpClient = require('../http.js')
const BaseProvider = require('./base.js')
const Debug = require('debug')('xbox-webapi-node:provider_screenshots')

module.exports = function(client){

    var provider = BaseProvider(client)
    provider._endpoint = 'https://screenshotsmetadata.xboxlive.com'

    provider._headers['x-xbl-contract-version'] = '5'

    provider.getUserScreenshots = function(){
        Debug('getUserScreenshots()')

        return this.get('/users/me/screenshots')
    }

    return provider
}