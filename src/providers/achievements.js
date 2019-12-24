const request = require('request')
const BaseProvider = require('./base.js')

module.exports = function(client)
{
    var Provider = BaseProvider(client, 'https://achievements.xboxlive.com')

    Provider.get_recent = function(xid){
        if(xid == undefined)
            xid = this.client.auth_manager.xsts_token.DisplayClaims.xui[0].xid

        return this.get('users/xuid('+xid+')/achievements?orderBy=UnlockTime')
    }

    Provider.get_achievement = function(service_id, achievement_id, xid){
        if(xid == undefined)
            xid = this.client.auth_manager.xsts_token.DisplayClaims.xui[0].xid

        return this.get('users/xuid('+xid+')/achievements/'+service_id+'/'+achievement_id)
    }

    Provider.get_user_achievements = function(xid){
        if(xid == undefined)
            xid = this.client.auth_manager.xsts_token.DisplayClaims.xui[0].xid

        return this.get('users/xuid('+xid+')/history/titles?orderBy=UnlockTime')
    }

    return Provider
}
