const QueryString = require('querystring')
const BaseProvider = require('./base.js')
const Debug = require('debug')('xbox-webapi-node:provider_gameclips')

module.exports = function(client){

    var provider = BaseProvider(client)
    provider._endpoint = 'https://gameclipsmetadata.xboxlive.com'

    provider._headers['x-xbl-contract-version'] = '1'

    provider.getUserGameclips = function(){
        Debug('getUserGameclips()')

        return this.get('/users/me/clips')
    }

    provider.getCommunityGameclipsByTitleId = function(titleId){
        Debug('getCommunityGameclipsByTitleId()')

        return this.get('/public/titles/'+titleId+'/clips/saved?qualifier=created')
    }

    provider.getGameclipsByXuid = function(xuid, titleId, skipItems, maxItems){
        Debug('getGameclipsByXuid()')

        var params = {
            skip_items: skipItems || 0,
            max_items: maxItems || 25,
        }

        if(titleId !== undefined){
            params.title_id = titleId
        }

        var queryParams = QueryString.stringify(params)

        return this.get('/users/xuid('+xuid+')/clips?'+queryParams)
    }

    return provider
}