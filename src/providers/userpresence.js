const BaseProvider = require('./base.js')
const Debug = require('debug')('xbox-webapi-node:provider_userpresence')

module.exports = function(client){

    var provider = BaseProvider(client)
    provider._endpoint = 'https://userpresence.xboxlive.com'

    provider._headers['x-xbl-contract-version'] = 3

    provider.getCurrentUser = function(){
        Debug('getCurrentUser()')

        return this.get('/users/me?level=all')
    }

    return provider
}