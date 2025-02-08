import { GameclipsResponse } from '../types/gameclips'

import BaseProvider from './base'

export default class GameclipsProvider extends BaseProvider {
    _endpoint = 'gameclipsmetadata.xboxlive.com'

    async getGameclips(continuationToken = undefined, maxItems = undefined, skipItems = undefined): Promise<GameclipsResponse> {
        return (await this.get(this.applyPagination('/users/me/clips', maxItems, skipItems, continuationToken)))
    }

    async getGameclipsByTitleId(titleId:string, continuationToken = undefined, maxItems = undefined, skipItems = undefined): Promise<GameclipsResponse> {
        return (await this.get(this.applyPagination('/public/titles/'+titleId+'/clips/saved?qualifier=created', maxItems, skipItems, continuationToken)))
    }

    async getGameclipsByXuid(xuid:string, continuationToken = undefined, maxItems = undefined, skipItems = undefined): Promise<GameclipsResponse> {
        return (await this.get(this.applyPagination('/users/xuid('+xuid+')/clips', maxItems, skipItems, continuationToken)))
    }
}