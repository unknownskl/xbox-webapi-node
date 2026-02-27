# usersearch

- Endpoint: usersearch.xboxlive.com
- Contract: x-xbl-contract-version = 1
- Description: Suggest-based search for Xbox users by keyword.

## Methods
- searchUsers(query)
  - GET /suggest?q={query}

## Parameters
- query: string — Search keyword

## 返回值
- 返回类型：HttpResponse<UsersearchResponse>
- 形态：返回建议用户列表
- 常见字段：
  - results[].xuid / gamertag / modernGamertag
  - results[].displayPic / gamerscore

示例（简化）：

```json
{
  "results": [
    {
      "xuid": "2533274981234567",
      "gamertag": "PlayerOne",
      "modernGamertag": "PlayerOne",
      "displayPic": "https://images-eds.xboxlive.com/gamerpic.png",
      "gamerscore": 12345
    }
  ]
}
```

## Example
```ts
import XboxWebApi from 'xbox-webapi'

async function suggest(uhs: string, xsts: string, keyword: string) {
  const api = new XboxWebApi({ uhs, token: xsts })
  const res = await api.providers.usersearch.searchUsers(keyword)
  console.log(res.data)
}
```

## Notes
- Returns HttpResponse<UsersearchResponse>
