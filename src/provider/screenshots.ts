import { GameclipsResponse } from '../types/gameclips'

import BaseProvider from './base'

export default class ScreenshotsProvider extends BaseProvider {
    _endpoint = 'screenshotsmetadata.xboxlive.com'
    _headers = {
        'X-Contract-Version': '5'
    }

    async getScreenshots(continuationToken = undefined, maxItems = undefined, skipItems = undefined): Promise<GameclipsResponse> {
        return (await this.get(this.applyPagination('/users/me/screenshots', maxItems, skipItems, continuationToken)))
    }

    async getScreenshotsByTitleId(titleId:string, continuationToken = undefined, maxItems = undefined, skipItems = undefined): Promise<GameclipsResponse> {
        return (await this.get(this.applyPagination('/public/titles/'+titleId+'/screenshots/saved?qualifier=created', maxItems, skipItems, continuationToken)))
    }

    async getScreenshotsByXuid(xuid:string, continuationToken = undefined, maxItems = undefined, skipItems = undefined): Promise<GameclipsResponse> {
        return (await this.get(this.applyPagination('/users/xuid('+xuid+')/screenshots/saved', maxItems, skipItems, continuationToken)))
    }
}