import XboxWebApi from '../lib'
import Http from '../lib/http'

export default class BaseProvider {
    private _api: XboxWebApi;
    private _defaultHeaders
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

    async get(path, headers?){
        const _headers = {
            ...this._defaultHeaders,
            ...this._headers,
            ...headers,
            'Authorization': this.getApi().getAuthorizationHeader()
        }

        const response = await new Http().getRequest(this._endpoint, path, _headers)
        return response.data
    }

    async post(path, data, headers?){
        const _headers = {
            ...this._defaultHeaders,
            ...this._headers,
            ...headers,
            'Authorization': this.getApi().getAuthorizationHeader()
        }

        const response = await new Http().postRequest(this._endpoint, path, _headers, data)
        return response.data
    }
}