# people

- Endpoint: peoplehub.xboxlive.com
- Description: Friends list and recently played with players.

## Methods
- getFriends()
  - GET /users/me/people/social/decoration/{preferredcolor,detail,multiplayersummary,presencedetail}
- recentPlayers(continuationToken?, maxItems?, skipItems?)
  - GET /users/me/people/recentplayers

## Parameters
- continuationToken?: string — Continue pagination
- maxItems?: number — Page size
- skipItems?: number — Offset

## 返回值
- 返回类型：HttpResponse<PeopleResponse>
- 形态：
  - getFriends：返回 people 列表，包含基础信息、偏好颜色、在线状态与多人游戏摘要等
  - recentPlayers：返回近期一起游玩的 people 列表，支持分页
- 常见字段：
  - people[].xuid / gamertag / displayName
  - people[].preferredColor.primaryColor
  - people[].presenceDetails[].state（Online/Offline），lastSeen 等
  - people[].multiplayerSummary（inMultiplayer/inParty 等）
- 分页：recentPlayers 响应头可含 x-continuation-token；可通过 response.next() 获取下一页

示例（简化）：

```json
{
  "people": [
    {
      "xuid": "2533274981234567",
      "gamertag": "PlayerOne",
      "displayName": "Player One",
      "preferredColor": { "primaryColor": "#107C10" },
      "presenceDetails": [
        { "state": "Online", "lastSeen": "2023-10-01T12:00:00Z" }
      ],
      "multiplayerSummary": { "inMultiplayer": false, "inParty": false }
    }
  ]
}
```

## Example
```ts
import XboxWebApi from 'xbox-webapi'

async function listFriends(uhs: string, xsts: string) {
  const api = new XboxWebApi({ uhs, token: xsts })
  const res = await api.providers.people.getFriends()
  console.log(res.data)
}
```

## Notes
- Returns HttpResponse<PeopleResponse>
- recentPlayers supports pagination
