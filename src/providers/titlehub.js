const BaseProvider = require('./base.js')
const Debug = require('debug')('xbox-webapi-node:provider_titlehub')

module.exports = function(client){

    var provider = BaseProvider(client)
    provider._endpoint = 'https://titlehub.xboxlive.com'

    provider.getTitleHistory = function(){
        Debug('getTitleHistory()')

        var params = [
            'achievement',
            'image',
            'scid',
        ]

        return this.get('/users/xuid('+this._client._authentication._user.xid+')/titles/titlehistory/decoration/'+params.join(','))
    }

    provider.getTitleId = function(titleId){
        Debug('getTitleId('+titleId+')')

        var params = [
            'achievement',
            'image',
            'detail',
            'scid',
            'alternateTitleId'
        ]

        return this.get('/users/xuid('+this._client._authentication._user.xid+')/titles/titleid('+titleId+')/decoration/'+params.join(','))
    }

    return provider
}