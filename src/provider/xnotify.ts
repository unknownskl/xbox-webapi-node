import { HttpResponse } from '../lib/http'
import { StatusResponse } from '../types/xnotify'

import BaseProvider from './base'

export default class XnotifyProvider extends BaseProvider {
    _endpoint = 'xnotify.xboxlive.com'

    async getLiveStatus(): Promise<HttpResponse<StatusResponse>> {
        return (await this.get('/servicestatusv6/GB/en-GB'))
    }
}