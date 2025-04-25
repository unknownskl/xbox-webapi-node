import { HttpResponse } from '../lib/http'
import { ProfileResponse } from '../types/profile'

import BaseProvider from './base'

export default class ProfileProvider extends BaseProvider {
    _endpoint = 'profile.xboxlive.com'
    _headers = {
        'x-xbl-contract-version': 3
    }

    async getCurrentUser(): Promise<HttpResponse<ProfileResponse>> {
        return (await this.get('/users/me/profile/settings?settings=GameDisplayName,GameDisplayPicRaw,Gamerscore,Gamertag'))
    }

    async getUserProfile(xuid:string): Promise<HttpResponse<ProfileResponse>> {
        return (await this.get('/users/xuid('+xuid+')/profile/settings?settings=GameDisplayName,GameDisplayPicRaw,Gamerscore,Gamertag'))
    }

    async getByGamertag(gamertag:string): Promise<HttpResponse<ProfileResponse>> {
        return (await this.get('/users/gt('+gamertag+')/profile/settings?settings=GameDisplayName,GameDisplayPicRaw,Gamerscore,Gamertag'))
    }
}