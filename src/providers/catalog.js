const QueryString = require('querystring')
const HttpClient = require('../http.js')
const BaseProvider = require('./base.js')
const Debug = require('debug')('xbox-webapi-node:provider_catalog')

module.exports = function(client){

    var provider = BaseProvider(client)
    provider._endpoint = 'https://displaycatalog.mp.microsoft.com'

    // provider._headers['Content-Type'] = 'application/json'
    provider._headers = {
        'MS-CV': '0'
    }

    // delete provider._headers['Authorization']

    provider.searchTitle = function(query){
        Debug('searchTitle('+query+')')

        var searchParams = {
            "languages": 'en-us',
            "market": 'us',
            "platformdependencyname": 'windows.xbox',
            "productFamilyNames": "Games,Apps",
            "query": query,
            "topProducts": 25,
        }

        var queryParams = QueryString.stringify(searchParams)

        return this.get('/v7.0/productFamilies/autosuggest?'+queryParams)
    }

    provider.getProductFromAlternateId = function(titleId, titleType){
        Debug('getProductFromAlternateId('+titleId, titleType+')')

        var searchParams = {
            "top": 25,
            "alternateId": titleType,
            "fieldsTemplate": 'details',
            // "languages": 'en-US',
            // "market": 'US',
            "languages": 'nl-NL',
            "market": 'NL',
            "value": titleId,
        }

        var queryParams = QueryString.stringify(searchParams)

        return this.get('/v7.0/products/lookup?'+queryParams)
    }

    return provider
}