import BaseProvider from './base'
const Debug = require('debug')('xbox-webapi-node:provider_social')

export default class SocialProvider extends BaseProvider {
    _endpoint = 'https://social.xboxlive.com'

    getFriends(){
        Debug('getFriends()')

        return this.get('/users/me/summary')
    }
}