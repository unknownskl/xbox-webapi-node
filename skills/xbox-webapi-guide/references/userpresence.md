# userpresence

- Endpoint: userpresence.xboxlive.com
- Contract: x-xbl-contract-version = 3
- Description: Presence for self, friends, or a specific user.

## Methods
- getCurrentUser()
  - GET /users/me?level=all
- getFriends()
  - GET /users/me/groups/People?level=all
- getUser(xuid)
  - GET /users/xuid({xuid})?level=all

## Parameters
- xuid: string — Target user XUID

## 返回值
- 返回类型：HttpResponse<UserResponse | UserResponse[]>
- 形态：
  - getCurrentUser/getUser：返回单个用户的在线状态对象
  - getFriends：返回包含多个用户状态的数组
- 常见字段：
  - xuid：用户 XUID
  - state：Online/Offline/Away
  - devices：设备列表，含 type、titles 等
  - devices[].titles[].activity.richPresence：富状态文本

示例（单用户）：

```json
{
  "xuid": "2533274981234567",
  "state": "Online",
  "devices": [
    {
      "type": "XboxOne",
      "titles": [
        {
          "id": 1292135258,
          "name": "Halo Infinite",
          "placement": "Full",
          "state": "Active",
          "activity": {
            "richPresence": "In Menus"
          }
        }
      ]
    }
  ]
}
```

示例（好友分组）：

```json
[
  {
    "xuid": "2533274987654321",
    "state": "Offline",
    "devices": []
  }
]
```

## Example
```ts
import XboxWebApi from 'xbox-webapi'

async function friendsPresence(uhs: string, xsts: string) {
  const api = new XboxWebApi({ uhs, token: xsts })
  const res = await api.providers.userpresence.getFriends()
  console.log(res.data)
}
```

## Notes
- Returns HttpResponse<UserResponse | UserResponse[]>
