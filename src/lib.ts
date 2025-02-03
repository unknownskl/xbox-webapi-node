import SmartglassProvider from './providers/smartglass'

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
        'smartglass': new SmartglassProvider(this)
    }

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