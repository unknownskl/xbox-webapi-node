export default class XboxWebApi {

    

}

export class TokenRefreshError implements Error {
    name = 'TokenRefreshError'
    message = 'Unknown error'

    constructor(message:string, public error?:any){
        this.message = message
        this.error = error
    }
}