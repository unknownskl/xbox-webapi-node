import BaseProvider from './base'
const Debug = require('debug')('xbox-webapi-node:provider_userpresence')

export default class PeopleProvider extends BaseProvider {
    _endpoint = 'https://userpresence.xboxlive.com'
    _headers = {
        'x-xbl-contract-version': '3',
    }

    getCurrentUser(){
        Debug('getCurrentUser()')

        return this.get('/users/me?level=all')
    }
}