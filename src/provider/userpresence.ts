import { UserResponse } from '../types/userpresence'

import BaseProvider from './base'

export default class UserpresenceProvider extends BaseProvider {
    _endpoint = 'userpresence.xboxlive.com'
    _headers = {
        'X-XBL-Contract-Version': '3'
    }

    async getCurrentUser(): Promise<UserResponse> {
        return (await this.get('/users/me?level=all'))
    }

    async getCurrentUser2(): Promise<UserResponse[]> {
        return (await this.get('/users/me/groups/People?level=all'))
    }

    async getUser(xuid:string): Promise<UserResponse> {
        return (await this.get('/users/xuid('+xuid+')?level=all'))
    }
}