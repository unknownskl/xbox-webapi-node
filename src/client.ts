import Authentication from './authentication'

// var ProfileProvider = require('./providers/profile')
// var SocialProvider = require('./providers/social')
// var PeopleProvider = require('./providers/people')
// var TitlehubProvider = require('./providers/titlehub')
// var CatalogProvider = require('./providers/catalog')
// var PinsProvider = require('./providers/pins')
// var ScreenshotsProvider = require('./providers/screenshots')
// var GameclipsProvider = require('./providers/gameclips')
// var SmartglassProvider = require('./providers/smartglass')
// var AchievementsProvider = require('./providers/achievements')
// var MessagesProvider = require('./providers/messages')
// var UserpresenceProvider = require('./providers/userpresence')
// var UserstatsProvider = require('./providers/userstats')

import ProfileProvider from './providers/profile'
import SocialProvider from './providers/social'
import PeopleProvider from './providers/people'
import TitlehubProvider from './providers/titlehub'
import CatalogProvider from './providers/catalog'
import PinsProvider from './providers/pins'
import ScreenshotsProvider from './providers/screenshots'
import GameclipsProvider from './providers/gameclips'
import SmartglassProvider from './providers/smartglass'
import AchievementsProvider from './providers/achievements'
import MessagesProvider from './providers/messages'
// import UserpresenceProvider from './providers/userpresence'
// import UserstatsProvider from './providers/userstats'

interface XboxWebClientConfig {
    clientId?: string
    clientSecret?: string
    userToken?: string
    uhs?: string
}

export default class XboxWebClient {

    _config: Required<XboxWebClientConfig>
    _authentication: Authentication

    // @TODO: Implement remaining providers
    _providers = {
        // userpresence: UserPresenceProvider,
        catalog: CatalogProvider,
        titlehub: TitlehubProvider,
        achievements: AchievementsProvider,
        // // gameserver: GameserverProvider,
        social: SocialProvider,
        people: PeopleProvider,
        profile: ProfileProvider,
        // // inventory: InventoryProvider,
        pins: PinsProvider,
        messages: MessagesProvider,
        gameclips: GameclipsProvider,
        screenshots: ScreenshotsProvider,
        smartglass: SmartglassProvider,
        // userpresence: UserpresenceProvider,
        // userstats: UserstatsProvider
    }

    constructor(config:XboxWebClientConfig = {}){
    
        this._config = {
            clientId: config.clientId || '',
            clientSecret: config.clientSecret || '',
            userToken: config.userToken || '',
            uhs: config.uhs || ''
        }

        this._authentication = new Authentication(this._config.clientId, this._config.clientSecret, this._config.userToken, this._config.uhs)
    }

    isAuthenticated() {
        return this._authentication.isAuthenticated()
    }

    getUserGamertag() {
        return this._authentication._user?.gamertag
    }

    startAuthServer(callback:any, port:number) {
        this._authentication.startServer(callback, port)

        return this._authentication.generateAuthorizationUrl()
    }

    getProvider(name:keyof typeof XboxWebClient.prototype._providers) {
        if(this._providers[name] !== undefined){
            return new this._providers[name](this, name)
        } else {
            return false
        }
    }
}