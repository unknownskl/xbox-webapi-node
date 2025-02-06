import { ConversationResponse, InboxResponse } from '../types/messages'

import BaseProvider from './base'
// import Uuid4 from 'uuid4'

export default class MessagesProvider extends BaseProvider {
    _endpoint = 'xblmessaging.xboxlive.com'

    async getInbox(): Promise<InboxResponse[]> {
        return (await this.get('/network/Xbox/users/me/inbox'))
    }

    async getConversation(xuid:string, maxItems = 100): Promise<ConversationResponse[]> {
        return (await this.get('/network/Xbox/users/me/conversations/users/xuid('+xuid+')?maxItems='+maxItems))
    }
}