import { HttpResponse } from '../lib/http'
import { URL } from 'url'

import BaseProvider from './base'

export default class RestProvider extends BaseProvider {
    _endpoint = 'xboxlive.com'
    _headers = {}
    
    async getRequest(url:string, xblContractVersion:undefined|number = undefined, continuationToken:undefined|string = undefined, maxItems = undefined, skipItems = undefined): Promise<HttpResponse> {
        if(! URL.canParse(url)){
            throw new Error('Invalid URL supplied')
        }

        const parsedUrl = new URL(url)
        this._endpoint = parsedUrl.hostname

        if(xblContractVersion !== undefined){
            this._headers['x-xbl-contract-version'] = xblContractVersion.toString()
        }

        return (await this.get(this.applyPagination(parsedUrl.pathname + parsedUrl.search, maxItems, skipItems, continuationToken)))
    }
}