import BaseProvider from './base'
const Debug = require('debug')('xbox-webapi-node:provider_people')

export default class PeopleProvider extends BaseProvider {
    _endpoint = 'https://peoplehub.xboxlive.com'
    _headers = {
        'x-xbl-contract-version': '3',
        'Accept-Language': 'en-US'
    }

    getFriends(){
        Debug('getFriends()')

        var params = [
            'preferredcolor',
            'detail',
            'multiplayersummary',
            'presencedetail',
        ]

        return this.get('/users/me/people/social/decoration/'+params.join(','))
    }

    recentPlayers(){
        Debug('recentPlayers()')

        return this.get('/users/me/people/recentplayers')
    }
}