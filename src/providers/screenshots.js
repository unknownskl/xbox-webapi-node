const QueryString = require('querystring')
const BaseProvider = require('./base.js')
const Debug = require('debug')('xbox-webapi-node:provider_screenshots')

module.exports = function(client){

    var provider = BaseProvider(client)
    provider._endpoint = 'https://screenshotsmetadata.xboxlive.com'

    provider._headers['x-xbl-contract-version'] = '5'

    provider.getUserScreenshots = function(){
        Debug('getUserScreenshots()')

        return this.get('/users/me/screenshots')
    }

    provider.getCommunityScreenshotsByTitleId = function(titleId){
        Debug('getCommunityScreenshotsByTitleId()')

        return this.get('/public/titles/'+titleId+'/screenshots?qualifier=created')
    }

    provider.getScreenshotsByXuid = function(xuid, titleId, skipItems, maxItems){
        Debug('getScreenshotsByXuid()')

        var params = {
            skip_items: skipItems || 0,
            max_items: maxItems || 25,
        }

        if(titleId !== undefined){
            params.title_id = titleId
        }

        var queryParams = QueryString.stringify(params)

        return this.get('/users/xuid('+xuid+')/screenshots?'+queryParams)
    }

    return provider
}