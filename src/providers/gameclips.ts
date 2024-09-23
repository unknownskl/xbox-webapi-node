import BaseProvider from './base'
const QueryString = require('querystring')
const Debug = require('debug')('xbox-webapi-node:provider_gameclips')

interface GameclipsParams {
    skip_items: number,
    max_items: number,
    title_id?: string
}

export default class GameclipsProvider extends BaseProvider {
    _endpoint = 'https://gameclipsmetadata.xboxlive.com'
    _headers = {
        'x-xbl-contract-version': '1'
    }
    
    getUserGameclips(){
        Debug('getUserGameclips()')

        return this.get('/users/me/clips')
    }

    getCommunityGameclipsByTitleId(titleId:string){
        Debug('getCommunityGameclipsByTitleId()')

        return this.get('/public/titles/'+titleId+'/clips/saved?qualifier=created')
    }

    getGameclipsByXuid(xuid:string, titleId?:string, skipItems:number = 0, maxItems:number = 25){
        Debug('getGameclipsByXuid()')

        var params:GameclipsParams = {
            skip_items: skipItems,
            max_items: maxItems,
        }

        if(titleId !== undefined){
            params.title_id = titleId
        }

        var queryParams = QueryString.stringify(params)

        return this.get('/users/xuid('+xuid+')/clips?'+queryParams)
    }
}