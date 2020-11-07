const BaseProvider = require('./base.js')
const Debug = require('debug')('xbox-webapi-node:provider_social')

module.exports = function(client){

    var provider = BaseProvider(client)
    provider._endpoint = 'https://social.xboxlive.com'

    provider.getFriends = function(){
        Debug('getFriends()')

        return this.get('/users/me/summary')
    }

    return provider
}