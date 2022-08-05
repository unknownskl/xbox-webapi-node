const Authentication = require('./authentication')

var ProfileProvider = require('./providers/profile.js')
var SocialProvider = require('./providers/social.js')
var PeopleProvider = require('./providers/people.js')
var TitlehubProvider = require('./providers/titlehub.js')
var CatalogProvider = require('./providers/catalog.js')
var PinsProvider = require('./providers/pins.js')
var ScreenshotsProvider = require('./providers/screenshots.js')
var GameclipsProvider = require('./providers/gameclips.js')
var SmartglassProvider = require('./providers/smartglass.js')
var AchievementsProvider = require('./providers/achievements.js')
var MessagesProvider = require('./providers/messages.js')
var UserpresenceProvider = require('./providers/userpresence.js')
var UserstatsProvider = require('./providers/userstats')

module.exports = function(config){

    if(config === undefined)
        config = {}

    var clientConfig = {
        clientId: config.clientId || '',
        clientSecret: config.clientSecret || '',
        userToken: config.userToken || '',
        uhs: config.uhs || ''
    }

    return {
        _config: clientConfig,
        _authentication: Authentication(clientConfig['clientId'], clientConfig['clientSecret'], clientConfig['userToken'], clientConfig['uhs']),

        // @TODO: Implement remaining providers
        _providers: {
            // userpresence: UserPresenceProvider,
            catalog: CatalogProvider,
            titlehub: TitlehubProvider,
            achievements: AchievementsProvider,
            // gameserver: GameserverProvider,
            social: SocialProvider,
            people: PeopleProvider,
            profile: ProfileProvider,
            // inventory: InventoryProvider,
            pins: PinsProvider,
            messages: MessagesProvider,
            gameclips: GameclipsProvider,
            screenshots: ScreenshotsProvider,
            smartglass: SmartglassProvider,
            userpresence: UserpresenceProvider,
            userstats: UserstatsProvider
        },

        isAuthenticated: function(){
            return this._authentication.isAuthenticated()
        },

        getUserGamertag: function(){
            return this._authentication._user.gamertag
        },

        startAuthServer: function(callback, port){
            this._authentication.startServer(callback, port)

            return this._authentication.generateAuthorizationUrl()
        },

        getProvider: function(name){
            if(this._providers[name] != undefined){
                return this._providers[name](this, name)
            } else {
                return false
            }
        }
    }
}