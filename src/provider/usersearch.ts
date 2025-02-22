import { HttpResponse } from '../lib/http'
import { UsersearchResponse } from '../types/usersearch'

import BaseProvider from './base'

export default class UsersearchProvider extends BaseProvider {
    _endpoint = 'usersearch.xboxlive.com'
    _headers = {
        'x-xbl-contract-version': '1'
    }

    async searchUsers(query:string): Promise<HttpResponse<UsersearchResponse>> {
        return (await this.get('/suggest?q='+query))
    }
}