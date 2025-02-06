import { AchievementsResponse } from '../types/achievements'

import BaseProvider from './base'

export default class AchievementsProvider extends BaseProvider {
    _endpoint = 'achievements.xboxlive.com'
    _headers = {
        'X-XBL-Contract-Version': '2'
    }
    
    async getTitleAchievements(xuid:string, continuationToken = 0, maxItems = undefined, skipItems = undefined): Promise<AchievementsResponse> {
        return (await this.get(this.applyPagination('/users/xuid('+xuid+')/history/titles', maxItems, skipItems, continuationToken)))
    }
}