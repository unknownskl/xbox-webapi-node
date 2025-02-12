import XboxWebApi from '../lib'
import Http from '../lib/http'

export default class BaseProvider {
    private readonly _api: XboxWebApi;
    private _defaultHeaders
    private _disableAuthHeader = false
    _endpoint = 'xboxlive.com'
    _headers

    constructor(api:XboxWebApi){
        this._api = api
        this._defaultHeaders = {
            'Accept-Language': 'en-US',
            'Accept': 'application/json',
            'x-xbl-contract-version': '2',
        }
    }

    getApi(){
        return this._api
    }

    resetDefaultHeaders(){
        this._defaultHeaders = {}
        this._disableAuthHeader = true
        return true
    }

    applyPagination(path, maxItems, skipItems, continuationToken){
        const urlItems:string[] = []

        if(maxItems !== undefined){
            urlItems.push('maxItems='+maxItems)
        }
        if(skipItems !== undefined){
            urlItems.push('skipItems='+skipItems)
        }
        if(continuationToken !== undefined){
            urlItems.push('continuationToken='+continuationToken)
        }

        if(urlItems.length > 0){
            if(path.indexOf('?') > -1){
                return path + '&' + urlItems.join('&')
            } else {
                return path + '?' + urlItems.join('&')
            }
        } else {
            return path
        }
    }

    async get(path, headers?){
        const _headers = {
            ...this._defaultHeaders,
            ...this._headers,
            ...headers,
            ...(this._disableAuthHeader === true) ? {} : { 'Authorization': this.getApi().getAuthorizationHeader() }
        }

        const response = await new Http().getRequest(this._endpoint, path, _headers)
        return response.data
    }

    async delete(path, data, headers?){
        const _headers = {
            ...this._defaultHeaders,
            ...this._headers,
            ...headers,
            ...(this._disableAuthHeader === true) ? {} : { 'Authorization': this.getApi().getAuthorizationHeader() }
        }

        const response = await new Http().deleteRequest(this._endpoint, path, _headers)
        return response.data
    }

    async post(path, data, headers?){
        const _headers = {
            ...this._defaultHeaders,
            ...this._headers,
            ...headers,
            ...(this._disableAuthHeader === true) ? {} : { 'Authorization': this.getApi().getAuthorizationHeader() }
        }

        const response = await new Http().postRequest(this._endpoint, path, _headers, data)
        return response.data
    }

    async put(path, data, headers?){
        const _headers = {
            ...this._defaultHeaders,
            ...this._headers,
            ...headers,
            ...(this._disableAuthHeader === true) ? {} : { 'Authorization': this.getApi().getAuthorizationHeader() }
        }

        const response = await new Http().putRequest(this._endpoint, path, _headers, data)
        return response.data
    }
}