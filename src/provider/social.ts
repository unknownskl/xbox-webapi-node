import { SummaryResponse } from '../types/social'

import BaseProvider from './base'

export default class SocialProvider extends BaseProvider {
    _endpoint = 'social.xboxlive.com'

    async getSummary(): Promise<SummaryResponse> {
        return (await this.get('/users/me/summary'))
    }

    async getSummaryByXuid(xuid:string): Promise<SummaryResponse> {
        return (await this.get('/users/xuid('+xuid+')/summary'))
    }

    async getSummaryByGamertag(gamertag:string): Promise<SummaryResponse> {
        return (await this.get('/users/gt('+gamertag+')/summary'))
    }
}