import { HttpResponse } from '../lib/http'
import { PeopleResponse } from '../types/people'

import BaseProvider from './base'

export default class PeopleProvider extends BaseProvider {
    _endpoint = 'peoplehub.xboxlive.com'

    async getFriends(): Promise<HttpResponse<PeopleResponse>> {
        const params = [
            'preferredcolor',
            'detail',
            'multiplayersummary',
            'presencedetail',
        ]
        return (await this.get('/users/me/people/social/decoration/'+params.join(',')))
    }

    async recentPlayers(continuationToken:undefined|string = undefined, maxItems = undefined, skipItems = undefined): Promise<HttpResponse<PeopleResponse>> {
        return (await this.get(this.applyPagination('/users/me/people/recentplayers', maxItems, skipItems, continuationToken)))
    }
}