# profile

- Endpoint: profile.xboxlive.com
- Contract: x-xbl-contract-version = 3
- Description: User basic profile including display name, gamerpic, Gamerscore, and Gamertag.

## Methods
- getCurrentUser()
  - GET /users/me/profile/settings?settings=GameDisplayName,GameDisplayPicRaw,Gamerscore,Gamertag
- getUserProfile(xuid)
  - GET /users/xuid({xuid})/profile/settings?settings=GameDisplayName,GameDisplayPicRaw,Gamerscore,Gamertag
- getByGamertag(gamertag)
  - GET /users/gt({gamertag})/profile/settings?settings=GameDisplayName,GameDisplayPicRaw,Gamerscore,Gamertag

## Parameters
- xuid: string — Target user XUID
- gamertag: string — Target user Gamertag

## 返回值
- 返回类型：HttpResponse<ProfileResponse>
- 形态：顶层包含 profileUsers 数组；每个用户含 id 与 settings
- settings.id 对应请求的设置名，value 为字符串值

示例：

```json
{
  "profileUsers": [
    {
      "id": "2533274981234567",
      "settings": [
        { "id": "GameDisplayName", "value": "Player One" },
        { "id": "GameDisplayPicRaw", "value": "https://images-eds.xboxlive.com/image.png" },
        { "id": "Gamerscore", "value": "12345" },
        { "id": "Gamertag", "value": "PlayerOne" }
      ]
    }
  ]
}
```

## Example
```ts
import XboxWebApi from 'xbox-webapi'

async function getMe(uhs: string, xsts: string) {
  const api = new XboxWebApi({ uhs, token: xsts })
  const res = await api.providers.profile.getCurrentUser()
  console.log(res.data)
}
```

## Notes
- Returns HttpResponse<ProfileResponse>
