const request = require('request')
const BaseProvider = require('./base.js')

module.exports = function(client)
{
    var Provider = BaseProvider(client, 'https://userpresence.xboxlive.com', {'x-xbl-contract-version': '3', 'Accept': 'application/json'})

    Provider.get_current_presence = function(){
        return this.get('users/me')
    }

    Provider.get_presence_batch = function(xuid_array, online_only = false, presence_level){

        return this.post('users/batch', {
            "users": xuid_array,
            "onlineOnly": online_only,
            "level": 'all'
        })
    }

    Provider.get_user_presence = function(xid){
        if(xid == undefined)
            xid = this.client.auth_manager.xsts_token.DisplayClaims.xui[0].xid

        return this.get('users/xuid('+xid+')?level=all')
    }

    Provider.get_user_title = function(xid){
        if(xid == undefined)
            xid = this.client.auth_manager.xsts_token.DisplayClaims.xui[0].xid

        return this.get('users/xuid('+xid+')/devices/current/titles/current')
    }

    return Provider
}
