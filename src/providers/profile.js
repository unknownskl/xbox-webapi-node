const request = require('request')
const BaseProvider = require('./base.js')

module.exports = function(client)
{
    var Provider = BaseProvider(client, 'https://profile.xboxlive.com')

    Provider.get_friends_list = function(){
        return this.get('users/me/profile/settings/people/people?settings=GameDisplayName,GameDisplayPicRaw,Gamerscore,Gamertag')
    }

    Provider.get_user_profile = function(xid){
        return this.get('/users/xuid('+xid+')/profile/settings?settings=GameDisplayName,GameDisplayPicRaw,Gamerscore,Gamertag')
    }

    Provider.get_gamertag_profile = function(gamertag){
        return this.get('/users/gt('+gamertag+')/profile/settings?settings=GameDisplayName,GameDisplayPicRaw,Gamerscore,Gamertag')
    }

    return Provider
}
