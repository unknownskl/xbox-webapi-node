import BaseProvider from './base'
const Debug = require('debug')('xbox-webapi-node:provider_messages')

export default class MessagesProvider extends BaseProvider {
    _endpoint = 'https://xblmessaging.xboxlive.com'

    getInbox(){
        Debug('getInbox()')

        return this.get('/network/Xbox/users/me/inbox')
        
    }

    getConversation(xuid:string){
        Debug('getConversation('+xuid+')')

        return this.get('/network/Xbox/users/me/conversations/users/xuid('+xuid+')?maxItems=100')
    }
}