# userstats

- Endpoint: userstats.xboxlive.com
- Contract: x-xbl-contract-version = 2
- Description: Query user statistics for a given title (example includes MinutesPlayed).

## Methods
- getUserTitleStats(xuid, titleId)
-  - POST /batch (Body example includes groups: Hero, stats: MinutesPlayed)

## Parameters
- xuid: string — Target user XUID
- titleId: string — Xbox title ID

## 返回值
- 返回类型：HttpResponse<UserstatResponse>
- 形态：统计结果按用户/标题分组，包含 stat 名称与值
- 常见字段：
  - xuid / scid（或 titleId）/ stats[]
  - stats[].name / value / type（Number/String/Duration 等）

示例（简化）：

```json
{
  "xuid": "2533274981234567",
  "titleId": "1292135258",
  "stats": [
    { "name": "MinutesPlayed", "value": 1234, "type": "Number" }
  ]
}
```

## Example
```ts
import XboxWebApi from 'xbox-webapi'

async function minutesPlayed(uhs: string, xsts: string, xuid: string, titleId: string) {
  const api = new XboxWebApi({ uhs, token: xsts })
  const res = await api.providers.userstats.getUserTitleStats(xuid, titleId)
  console.log(res.data)
}
```

## Notes
- Returns HttpResponse<UserstatResponse>
