# messages

- Endpoint: xblmessaging.xboxlive.com
- Description: Message inbox and conversations.

## Methods
- getInbox()
  - GET /network/Xbox/users/me/inbox
- getConversation(xuid, continuationToken?, maxItems?, skipItems?)
  - GET /network/Xbox/users/me/conversations/users/xuid({xuid})

## Parameters
- xuid: string — Target user XUID
- continuationToken?: string — Continue pagination
- maxItems?: number — Page size
- skipItems?: number — Offset

## 返回值
- 返回类型：HttpResponse<InboxResponse | ConversationResponse>
- 形态：
  - Inbox：包含会话摘要数组（会话 ID、参与者、最后一条消息、未读计数等）
  - Conversation：包含消息数组（消息 ID、发送者 XUID、时间戳、内容等）
- 分页：会话消息支持分页，响应头可含 x-continuation-token；可调用 response.next()

示例（Inbox 简化）：

```json
{
  "conversations": [
    {
      "conversationId": "c-0000000000000001",
      "participants": ["2533274981234567", "2533274987654321"],
      "lastMessage": {
        "messageId": "m-0001",
        "senderXuid": "2533274987654321",
        "sentDateTimeUtc": "2023-10-01T12:00:00Z",
        "content": "Hi!"
      },
      "unreadCount": 1
    }
  ]
}
```

示例（Conversation 简化）：

```json
{
  "messages": [
    {
      "messageId": "m-0001",
      "senderXuid": "2533274987654321",
      "sentDateTimeUtc": "2023-10-01T12:00:00Z",
      "content": "Hi!"
    }
  ]
}
```

## Example
```ts
import XboxWebApi from 'xbox-webapi'

async function getInbox(uhs: string, xsts: string) {
  const api = new XboxWebApi({ uhs, token: xsts })
  const res = await api.providers.messages.getInbox()
  console.log(res.data)
}
```

## Notes
- Returns HttpResponse<InboxResponse | ConversationResponse>
- Conversation lists support pagination
