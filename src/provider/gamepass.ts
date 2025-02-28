import QueryString from 'node:querystring'
import pkg from '../../package.json'
import { SiglResponse, ProductsResponse } from '../types/gamepass'

import BaseProvider from './base'
import { HttpResponse } from '../lib/http'

export default class GamepassProvider extends BaseProvider {
    _endpoint = 'catalog.gamepass.com'
    _headers = {
        'MS-CV': '1.0',
        'calling-app-name': 'github.com/unknownskl/xbox-webapi-node',
        'calling-app-version': pkg.version,
    }
    
    async getSigl(siglId:string, market = 'us', language = 'en-us', continuationToken:undefined|string = undefined, maxItems = undefined, skipItems = undefined): Promise<HttpResponse<SiglResponse>> {
        const searchParams = {
            "id": siglId,
            "market": market,
            "language": language,
        }
        const queryParams = QueryString.stringify(searchParams)
        return (await this.get('/sigls/v2?'+queryParams))
    }

    async getProducts(products:string[], market = 'us', language = 'en-us', continuationToken:undefined|string = undefined, maxItems = undefined, skipItems = undefined): Promise<HttpResponse<ProductsResponse>> {
        const searchParams = {
            "hydration": 'MobileLowAmber0', // Slow fetch: RemoteHighSapphire0, Fast fetch: MobileLowAmber0
            "market": market,
            "language": language,
        }
        const queryParams = QueryString.stringify(searchParams)
        return (await this.post('/v3/products?'+queryParams,{
            Products: products
        }))
    }

    async getProductsDetailed(products:string[], market = 'us', language = 'en-us', continuationToken:undefined|string = undefined, maxItems = undefined, skipItems = undefined): Promise<HttpResponse<any>> {
        if(products.length > 20){
            throw new Error('Maximum of 20 products can be requested at a time')
        }

        const searchParams = {
            "hydration": 'RemoteHighSapphire0', // Slow fetch: RemoteHighSapphire0, Fast fetch: MobileLowAmber0
            "market": market,
            "language": language,
        }
        const queryParams = QueryString.stringify(searchParams)
        return (await this.post('/v3/products?'+queryParams,{
            Products: products
        }))
    }
}

// 393f05bf-e596-4ef6-9487-6d4fa0eab987