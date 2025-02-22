import { HttpResponse } from '../lib/http'
import { ConversationResponse, InboxResponse } from '../types/messages'

import BaseProvider from './base'

export default class MessagesProvider extends BaseProvider {
    _endpoint = 'xblmessaging.xboxlive.com'

    async getInbox(): Promise<HttpResponse<InboxResponse>> {
        return (await this.get('/network/Xbox/users/me/inbox'))
    }

    async getConversation(xuid:string, continuationToken:undefined|string = undefined, maxItems = undefined, skipItems = undefined): Promise<HttpResponse<ConversationResponse>> {
        return (await this.get(this.applyPagination('/network/Xbox/users/me/conversations/users/xuid('+xuid+')', maxItems, skipItems, continuationToken)))
    }
}