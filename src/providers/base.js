const HttpClient = require('../http.js')
const Debug = require('debug')('xbox-webapi-node:provider_base')

module.exports = function(client, providerName){
    return {
        _endpoint: 'https://xboxlive.com',
        _client: client,
        _provider: providerName,

        _headers: {
            'Authorization': (client._authentication._userToken !== '' && client._authentication._uhs !== '') ? 'XBL3.0 x='+client._authentication._uhs+';'+client._authentication._userToken : 'XBL3.0 x='+client._authentication._user.uhs+';'+client._authentication._tokens.xsts.Token,
            'Accept-Language': 'en-US',
            'x-xbl-contract-version': '2',
            'x-xbl-client-name': 'XboxApp',
            'x-xbl-client-type': 'UWA',
            'x-xbl-client-version': '39.39.22001.0'
        },

        get: function(url){
            return new Promise(function(resolve, reject) {
                Debug('GET '+url)

                HttpClient().get(this._endpoint+url, this._headers).then(function(response){
                    var responseObject = JSON.parse(response)
                    // delete responseObject.titles
                    // console.log(responseObject)

                    if(providerName == 'smartglass'){
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
            }.bind(this))
        },

        post: function(url, postData){
            return new Promise(function(resolve, reject) {
                Debug('POST ', url, postData)

                HttpClient().post(this._endpoint+url, this._headers, postData).then(function(response){
                    var responseObject = JSON.parse(response)
                    
                    if(providerName == 'smartglass'){
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
            }.bind(this))
        }
    }
}