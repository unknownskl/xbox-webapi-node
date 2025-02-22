import { HttpResponse } from '../lib/http'
import { PinsResponse } from '../types/pins'

import BaseProvider from './base'

export default class PinsProvider extends BaseProvider {
    _endpoint = 'eplists.xboxlive.com'

    async getPins(xuid:string, listname = 'XBLPins'): Promise<HttpResponse<PinsResponse>> {
        return (await this.get('/users/xuid('+xuid+')/lists/PINS/'+listname))
    }

    async getSavedForLater(xuid:string): Promise<HttpResponse<PinsResponse>> {
        return (await this.getPins(xuid, 'SaveForLater'))
    }
}