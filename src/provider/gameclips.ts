import { HttpResponse } from '../lib/http'
import { GameclipsResponse } from '../types/gameclips'

import BaseProvider from './base'

export default class GameclipsProvider extends BaseProvider {
    _endpoint = 'mediahub.xboxlive.com'

    _headers = {
        'x-xbl-contract-version': '3'
    }

    async getGameclips(xuid:string, continuationToken:undefined|string = undefined, maxItems = undefined, skipItems = undefined): Promise<HttpResponse<GameclipsResponse>> {
        return (await this.post(this.applyPagination('/gameclips/search', maxItems, skipItems, continuationToken),
            {
                query: "OwnerXuid eq "+xuid,
                max: maxItems,
                skip: skipItems
            }
        ))
    }
}