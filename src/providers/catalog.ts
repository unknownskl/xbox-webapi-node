import BaseProvider from './base'
const QueryString = require('querystring')
const Debug = require('debug')('xbox-webapi-node:provider_catalog')

export default class CatalogProvider extends BaseProvider {
    _endpoint = 'https://displaycatalog.mp.microsoft.com'
    _headers = {
        'MS-CV': '0'
    }

    searchTitle(query:string, marketLocale = 'us', languagesLocale = 'en-us'){
        Debug('searchTitle('+query+')')

        var searchParams = {
            "languages": languagesLocale,
            "market": marketLocale,
            "platformdependencyname": 'windows.xbox',
            "productFamilyNames": "Games,Apps",
            "query": query,
            "topProducts": 25,
        }

        var queryParams = QueryString.stringify(searchParams)

        return this.get('/v7.0/productFamilies/autosuggest?'+queryParams)
    }

    getProductId(query:string, marketLocale = 'us', languagesLocale = 'en-us'){
        Debug('getProductId('+query+')')

        var searchParams = {
            "actionFilter": 'Browse',
            "bigIds": [query],
            "fieldsTemplate": 'details',
            "languages": languagesLocale,
            "market": marketLocale,
        }

        var queryParams = QueryString.stringify(searchParams)

        return this.get('/v7.0/products?'+queryParams)
    }

    getProductFromAlternateId(titleId:string, titleType:string, marketLocale = 'US', languagesLocale = 'en-US'){
        Debug('getProductFromAlternateId('+titleId, titleType+')')

        var searchParams = {
            "top": 25,
            "alternateId": titleType,
            "fieldsTemplate": 'details',
            // "languages": 'en-US',
            // "market": 'US',
            "languages": languagesLocale,
            "market": marketLocale,
            "value": titleId,
        }

        var queryParams = QueryString.stringify(searchParams)

        return this.get('/v7.0/products/lookup?'+queryParams)
    }
}
