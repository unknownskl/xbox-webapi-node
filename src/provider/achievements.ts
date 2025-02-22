import { HttpResponse } from '../lib/http'
import { AchievementsResponse, AchievementsTitleResponse } from '../types/achievements'

import BaseProvider from './base'

export default class AchievementsProvider extends BaseProvider {
    _endpoint = 'achievements.xboxlive.com'
    _headers = {
        'x-xbl-contract-version': '2'
    }
    
    async getAchievements(xuid:string, continuationToken:undefined|string = undefined, maxItems = undefined, skipItems = undefined): Promise<HttpResponse<AchievementsResponse>> {
        return (await this.get(this.applyPagination('/users/xuid('+xuid+')/history/titles', maxItems, skipItems, continuationToken)))
    }
    
    async getTitleId(xuid:string, titleId:string, continuationToken:undefined|string = undefined, maxItems = undefined, skipItems = undefined): Promise<HttpResponse<AchievementsTitleResponse>> {
        return (await this.get(this.applyPagination('/users/xuid('+xuid+')/achievements?titleid='+titleId, maxItems, skipItems, continuationToken)))
    }
    
    async getItemDetail(xuid:string, serviceConfigId:string, achievementId:string, continuationToken:undefined|string = undefined, maxItems = undefined, skipItems = undefined): Promise<HttpResponse<AchievementsTitleResponse>> {
        return (await this.get(this.applyPagination('/users/xuid('+xuid+')/achievements/'+serviceConfigId+'/'+achievementId, maxItems, skipItems, continuationToken)))
    }
}