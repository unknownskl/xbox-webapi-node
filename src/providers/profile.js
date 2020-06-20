const request = require('request')
const BaseProvider = require('./base.js')

module.exports = function(client)
{
    var Provider = BaseProvider(client, 'https://profile.xboxlive.com')

    Provider.GAME_DISPLAY_NAME = 'GameDisplayName',
    Provider.APP_DISPLAY_NAME = 'AppDisplayName',
    Provider.APP_DISPLAYPIC_RAW = 'AppDisplayPicRaw',
    Provider.GAMERSCORE = 'Gamerscore',
    Provider.GAMERTAG = 'Gamertag',
    Provider.GAME_DISPLAYPIC_RAW = 'GameDisplayPicRaw',
    Provider.PUBLIC_GAMERPIC = 'PublicGamerpic',
    Provider.SHOW_USER_AS_AVATAR = 'ShowUserAsAvatar',
    Provider.ACCOUNT_TIER = 'AccountTier',
    Provider.TENURE_LEVEL = 'TenureLevel',
    Provider.XBOX_ONE_REP = 'XboxOneRep',
    Provider.PREFERRED_COLOR = 'PreferredColor',
    Provider.LOCATION = 'Location',
    Provider.BIOGRAPHY = 'Bio',
    Provider.WATERMARKS = 'Watermarks',
    Provider.REAL_NAME = 'RealName'

    // V2 api
    Provider.get_profiles = function(xuid_array, types){
        if(types == undefined)
        types = [
            Provider.GAME_DISPLAY_NAME,
            Provider.APP_DISPLAY_NAME,
            Provider.APP_DISPLAYPIC_RAW,
            Provider.GAMERSCORE,
            Provider.GAMERTAG,
            Provider.GAME_DISPLAYPIC_RAW,
            Provider.ACCOUNT_TIER,
            Provider.TENURE_LEVEL,
            Provider.XBOX_ONE_REP,
            Provider.PREFERRED_COLOR,
            Provider.LOCATION,
            Provider.BIOGRAPHY,
            Provider.WATERMARKS,
            Provider.REAL_NAME
        ]

        return this.post('users/batch/profile/settings', {
            "settings": types,
            "userIds": xuid_array
        })
    }

    Provider.get_profile_by_xuid = function(xuid, types){
        types = [
            Provider.APP_DISPLAY_NAME,
            Provider.GAMERSCORE,
            Provider.GAMERTAG,
            Provider.PUBLIC_GAMERPIC,
            Provider.XBOX_ONE_REP
        ]

        return this.get('users/xuid('+xuid+')/profile/settings?settings='+types.join(','))
    }

    Provider.get_profile_by_gamertag = function(gamertag, types){
        types = [
            Provider.APP_DISPLAY_NAME,
            Provider.GAMERSCORE,
            Provider.GAMERTAG,
            Provider.PUBLIC_GAMERPIC,
            Provider.XBOX_ONE_REP
        ]

        return this.get('users/gt('+gamertag+')/profile/settings?settings='+types.join(','))
    }

    Provider.get_friends_by_xuid = function(xuid, types){
        types = [
            Provider.APP_DISPLAY_NAME,
            Provider.GAMERSCORE,
            Provider.GAMERTAG,
            Provider.PUBLIC_GAMERPIC,
            Provider.XBOX_ONE_REP
        ]

        return this.get('users/xuid('+xuid+')/profile/settings/people/people?settings='+types.join(','))
    }

    Provider.get_friends_by_gamertag = function(gamertag, types){
        types = [
            Provider.APP_DISPLAY_NAME,
            Provider.GAMERSCORE,
            Provider.GAMERTAG,
            Provider.PUBLIC_GAMERPIC,
            Provider.XBOX_ONE_REP
        ]

        return this.get('users/gt('+gamertag+')/profile/settings/people/people?settings='+types.join(','))
    }


    // V1 api
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
