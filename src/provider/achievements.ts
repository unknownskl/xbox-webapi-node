import { AchievementsResponse } from '../types/achievements'

import BaseProvider from './base'

export default class AchievementsProvider extends BaseProvider {
    _endpoint = 'achievements.xboxlive.com'
    _headers = {
        'X-XBL-Contract-Version': '2'
    }
    
    async getTitleAchievements(xuid:string): Promise<AchievementsResponse> {
        return (await this.get('/users/xuid('+xuid+')/history/titles'))
    }
}