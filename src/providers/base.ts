import Client from '../client'
import HttpClient from '../http'

const Debug = require('debug')('xbox-webapi-node:provider_base')

export default class BaseProvider{

    _endpoint = 'https://xboxlive.com'
    _client: Client
    _provider: string

    _headers: {
        [key: string]: string
    }

    constructor(client:Client, providerName:string){
        this._client = client
        this._provider = providerName

        this._headers = {
            'Authorization': (client._authentication._userToken !== '' && client._authentication._uhs !== '') ? 'XBL3.0 x='+client._authentication._uhs+';'+client._authentication._userToken : 'XBL3.0 x='+client._authentication._user?.uhs+';'+client._authentication._tokens.xsts?.Token,
            'Accept-Language': 'en-US',
            'x-xbl-contract-version': '2',
            'x-xbl-client-name': 'XboxApp',
            'x-xbl-client-type': 'UWA',
            'x-xbl-client-version': '39.39.22001.0'
        }
    }   

    get(url:string){
        return new Promise((resolve, reject) => {
            Debug('GET '+url)

            new HttpClient().get(this._endpoint+url, this._headers).then((response) =>{
                var responseObject = JSON.parse(response)

                if(this._provider === 'smartglass'){
                    if(responseObject.status.errorCode != 'OK'){
                        reject(responseObject.status)
                    } else {
                        resolve(responseObject)
                    }
                } else {
                    resolve(responseObject)
                }
            }).catch((error) =>{
                reject(error)
            })
        })
    }

    post(url:string, postData:string){
        return new Promise((resolve, reject) => {
            Debug('POST ', url, postData)

            new HttpClient().post(this._endpoint+url, this._headers, postData).then((response) => {
                var responseObject = JSON.parse(response)
                
                if(this._provider === 'smartglass'){
                    if(responseObject.status.errorCode != 'OK'){
                        reject(responseObject.status)
                    } else {
                        resolve(responseObject)
                    }
                } else {
                    resolve(responseObject)
                }
            }).catch(function(error){
                reject(error)
            })
        })
    }
}