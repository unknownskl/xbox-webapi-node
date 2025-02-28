import XboxWebApi from '../lib'
import Http, { applyPagination } from '../lib/http'

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
            'Content-Type': 'application/json'
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

    applyPagination = applyPagination

    async get(path, headers?){
        const _headers = {
            ...this._defaultHeaders,
            ...this._headers,
            ...headers,
            ...(this._disableAuthHeader === true) ? {} : { 'Authorization': this.getApi().getAuthorizationHeader() }
        }

        const response = await new Http().getRequest(this._endpoint, path, _headers)
        return response
    }

    async delete(path, data, headers?){
        const _headers = {
            ...this._defaultHeaders,
            ...this._headers,
            ...headers,
            ...(this._disableAuthHeader === true) ? {} : { 'Authorization': this.getApi().getAuthorizationHeader() }
        }

        const response = await new Http().deleteRequest(this._endpoint, path, _headers)
        return response
    }

    async post(path, data, headers?){
        const _headers = {
            ...this._defaultHeaders,
            ...this._headers,
            ...headers,
            ...(this._disableAuthHeader === true) ? {} : { 'Authorization': this.getApi().getAuthorizationHeader() }
        }

        const response = await new Http().postRequest(this._endpoint, path, _headers, data)
        return response
    }

    async put(path, data, headers?){
        const _headers = {
            ...this._defaultHeaders,
            ...this._headers,
            ...headers,
            ...(this._disableAuthHeader === true) ? {} : { 'Authorization': this.getApi().getAuthorizationHeader() }
        }

        const response = await new Http().putRequest(this._endpoint, path, _headers, data)
        return response
    }
}