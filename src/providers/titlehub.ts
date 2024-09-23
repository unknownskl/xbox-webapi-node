import BaseProvider from './base'
const Debug = require('debug')('xbox-webapi-node:provider_titlehub')

export default class TitleHubProvider extends BaseProvider {
    _endpoint = 'https://titlehub.xboxlive.com'
    
    getTitleHistory(){
        Debug('getTitleHistory()')

        var params = [
            'achievement',
            'image',
            'scid',
        ]

        return this.get('/users/xuid('+this._client._authentication._user?.xid+')/titles/titlehistory/decoration/'+params.join(','))
    }

    getTitleId(titleId:string){
        Debug('getTitleId('+titleId+')')

        var params = [
            'achievement',
            'image',
            'detail',
            'scid',
            'alternateTitleId'
        ]

        return this.get('/users/xuid('+this._client._authentication._user?.xid+')/titles/titleid('+titleId+')/decoration/'+params.join(','))
    }
}