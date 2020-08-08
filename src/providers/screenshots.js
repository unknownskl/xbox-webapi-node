const request = require('request')
const BaseProvider = require('./base.js')

module.exports = function(client)
{
    var Provider = BaseProvider(client, 'https://screenshotsmetadata.xboxlive.com', {'x-xbl-contract-version': '5', 'Accept': 'application/json'})

    Provider.get_recent = function(title_id){
        var url = 'users/me'

        if(title_id != undefined)
            url += '/titles/'+title_id

        url += '/screenshots'
        return this.get(url)
    }

    Provider.get_saved_screenshots = function(title_id){
        var url = 'users/me'

        if(title_id != undefined)
            url += '/titles/'+title_id

        url += '/screenshots/saved'
        return this.get(url)
    }

    Provider.get_user_recent = function(xid, title_id){
        var url = 'users/xuid('+xid+')'

        if(title_id != undefined)
            url += '/titles/'+title_id

        url += '/screenshots'
        return this.get(url)
    }

    Provider.get_recent_community_screenshots_by_title_id = function(title_id){
        return this.get('public/titles/'+title_id+'/screenshots?qualifier=created')
    }

    Provider.get_saved_community_screenshots_by_title_id = function(title_id){
        return this.get('public/titles/'+title_id+'/screenshots/saved?qualifier=created')
    }

    return Provider
}
