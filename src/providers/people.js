const BaseProvider = require('./base.js')
const Debug = require('debug')('xbox-webapi-node:provider_people')

module.exports = function(client){

    var provider = BaseProvider(client)
    provider._endpoint = 'https://peoplehub.xboxlive.com'

    provider._headers['x-xbl-contract-version'] = 3
    provider._headers['Accept-Language'] = 'en-US'

    provider.getFriends = function(){
        Debug('getFriends()')

        var params = [
            'preferredcolor',
            'detail',
            'multiplayersummary',
            'presencedetail',
        ]

        return this.get('/users/me/people/social/decoration/'+params.join(','))
    }

    provider.recentPlayers = function(){
        Debug('recentPlayers()')

        return this.get('/users/me/people/recentplayers')
    }

    return provider
}