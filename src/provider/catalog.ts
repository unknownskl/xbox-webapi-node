import QueryString from 'node:querystring'
import { CatalogSearchResponse } from '../types/catalog'

import BaseProvider from './base'

export default class CatalogProvider extends BaseProvider {
    _endpoint = 'displaycatalog.mp.microsoft.com'
    _headers = {
        'MS-CV': '1.0',
    }
    
    async searchTitle(query:string, market = 'us', language = 'en-us', continuationToken = undefined, maxItems = undefined, skipItems = undefined): Promise<CatalogSearchResponse> {
        const searchParams = {
            "languages": language,
            "market": market,
            "platformdependencyname": 'windows.xbox',
            "productFamilyNames": "Games,Apps",
            "query": query,
            "topProducts": 25,
        }

        const queryParams = QueryString.stringify(searchParams)
        this.resetDefaultHeaders()

        return (await this.get(this.applyPagination('/v7.0/productFamilies/autosuggest?'+queryParams, maxItems, skipItems, continuationToken)))
    }
    
    async getProductId(query:string, market = 'us', language = 'en-us', continuationToken = undefined, maxItems = undefined, skipItems = undefined): Promise<CatalogSearchResponse> {
        const searchParams = {
            "actionFilter": 'Browse',
            "bigIds": [query],
            "fieldsTemplate": 'details',
            "languages": language,
            "market": market,
        }

        const queryParams = QueryString.stringify(searchParams)
        this.resetDefaultHeaders()

        return (await this.get(this.applyPagination('/v7.0/productFamilies/autosuggest?'+queryParams, maxItems, skipItems, continuationToken)))
    }

    async getProductFromAlternateId(titleId:string, titleType:string, market = 'us', language = 'en-us', continuationToken = undefined, maxItems = undefined, skipItems = undefined): Promise<CatalogSearchResponse> {
        const searchParams = {
            "top": 25,
            "alternateId": titleType,
            "fieldsTemplate": 'details',
            // "languages": 'en-US',
            // "market": 'US',
            "languages": language,
            "market": market,
            "value": titleId,
        }

        const queryParams = QueryString.stringify(searchParams)
        this.resetDefaultHeaders()

        return (await this.get(this.applyPagination('/v7.0/productFamilies/autosuggest?'+queryParams, maxItems, skipItems, continuationToken)))
    }
}