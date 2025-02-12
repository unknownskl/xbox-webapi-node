import SmartglassProvider from './provider/smartglass'
import MessagesProvider from './provider/messages'
import AchievementsProvider from './provider/achievements'
import UserpresenceProvider from './provider/userpresence'
import CatalogProvider from './provider/catalog'
import GameclipsProvider from './provider/gameclips'
import ScreenshotsProvider from './provider/screenshots'

type XboxWebApiConfig = {
    uhs: string
    token: string
    market?: string
}

export default class XboxWebApi {

    private readonly _config:XboxWebApiConfig

    constructor(config:XboxWebApiConfig){
        this._config = {
            market: 'en-us',
            ...config
        }
        
    }

    providers = {
        'achievements': new AchievementsProvider(this),
        'messages': new MessagesProvider(this),
        'userpresence': new UserpresenceProvider(this),
        'smartglass': new SmartglassProvider(this),
        'catalog': new CatalogProvider(this),
        'gameclips': new GameclipsProvider(this),
        'screenshots': new ScreenshotsProvider(this),
    }

    getAuthorizationHeader(){
        return 'XBL3.0 x='+this._config.uhs+';'+this._config.token
    }

}