import { HttpResponse } from '../lib/http'
import BaseProvider from './base'
import { ScreenshotsResponse } from '../types/screenshots'

export default class ScreenshotsProvider extends BaseProvider {
    _endpoint = 'mediahub.xboxlive.com'

    _headers = {
        'x-xbl-contract-version': '3'
    }

    async getScreenshots(xuid:string, continuationToken:undefined|string = undefined, maxItems = undefined, skipItems = undefined): Promise<HttpResponse<ScreenshotsResponse>> {
        return (await this.post(this.applyPagination('/screenshots/search', maxItems, skipItems, continuationToken),
            {
                query: "OwnerXuid eq "+xuid,
                max: maxItems,
                skip: skipItems
            }
        ))
    }
}