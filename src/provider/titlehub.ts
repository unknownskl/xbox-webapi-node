import { HttpResponse } from '../lib/http'
import { TitleHistoryResponse } from '../types/titlehub'

import BaseProvider from './base'

export default class TitlehubProvider extends BaseProvider {
    _endpoint = 'titlehub.xboxlive.com'

    async getTitleHistory(xuid:string): Promise<HttpResponse<TitleHistoryResponse>> {
        const params = [
            'achievement',
            'image',
            'scid',
        ]
        return (await this.get('/users/xuid('+xuid+')/titles/titlehistory/decoration/'+params.join(',')))
    }

    async getTitleId(xuid:string, titleId:string): Promise<HttpResponse<TitleHistoryResponse>> {

        const params = [
            'achievement',
            'image',
            'detail',
            'scid',
            'alternateTitleId'
        ]
        return (await this.get('/users/xuid('+xuid+')/titles/titleid('+titleId+')/decoration/'+params.join(',')))
    }
}