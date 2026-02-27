# social

- Endpoint: social.xboxlive.com
- Description: Social summary (following/followers/relationship overview).

## Methods
- getSummary()
  - GET /users/me/summary
- getSummaryByXuid(xuid)
  - GET /users/xuid({xuid})/summary
- getSummaryByGamertag(gamertag)
  - GET /users/gt({gamertag})/summary

## Parameters
- xuid: string — Target user XUID
- gamertag: string — Target user Gamertag

## 返回值
- 返回类型：HttpResponse<SummaryResponse>
- 形态：顶层包含的汇总对象，含 following/followers 计数、最近互动、关系状态等
- 常见字段：
  - peopleCount.followers / following
  - recentActivity / recommendationCount
  - relationship：是否互相关注、是否被屏蔽等

示例（简化）：

```json
{
  "peopleCount": {
    "followers": 120,
    "following": 80
  },
  "relationship": {
    "isFollowedByCaller": true,
    "isFollowingCaller": false,
    "isFavoriteByCaller": false
  },
  "recommendationCount": 5
}
```

## Example
```ts
import XboxWebApi from 'xbox-webapi'

async function getSocialSummary(uhs: string, xsts: string) {
  const api = new XboxWebApi({ uhs, token: xsts })
  const res = await api.providers.social.getSummary()
  console.log(res.data)
}
```

## Notes
- Returns HttpResponse<SummaryResponse>
