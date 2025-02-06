import SmartglassProvider from './provider/smartglass'
import MessagesProvider from './provider/messages'
import AchievementsProvider from './provider/achievements'
import UserpresenceProvider from './provider/userpresence'

// import Smartglass from './models/smartglass'

type XboxWebApiConfig = {
    uhs: string
    token: string
    market?: string
}

export default class XboxWebApi {

    private _config:XboxWebApiConfig

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
    }

    // models = {
    //     'smartglass': new Smartglass(this)
    // }

    getAuthorizationHeader(){
        return 'XBL3.0 x='+this._config.uhs+';'+this._config.token
    }

}

// export class TokenRefreshError implements Error {
//     name = 'TokenRefreshError'
//     message = 'Unknown error'

//     constructor(message:string, public error?:any){
//         this.message = message
//         this.error = error
//     }
// }