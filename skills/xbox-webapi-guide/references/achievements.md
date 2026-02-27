# achievements

- Endpoint: achievements.xboxlive.com
- Contract: x-xbl-contract-version = 2
- Description: Query user achievements, title history, and achievement item details. Supports pagination.

## Methods
- getAchievements(xuid, continuationToken?, maxItems?, skipItems?)
  - GET /users/xuid({xuid})/history/titles
- getTitleId(xuid, titleId, continuationToken?, maxItems?, skipItems?)
  - GET /users/xuid({xuid})/achievements?titleid={titleId}
- getItemDetail(xuid, serviceConfigId, achievementId, continuationToken?, maxItems?, skipItems?)
  - GET /users/xuid({xuid})/achievements/{serviceConfigId}/{achievementId}

## Parameters
- xuid: string — Target user XUID
- titleId: string — Xbox title ID (for per-title queries)
- serviceConfigId: string — SCID for a title/service
- achievementId: string — Achievement identifier within SCID
- continuationToken?: string — Token to continue pagination
- maxItems?: number — Page size
- skipItems?: number — Offset for pagination

## 返回值
- 返回类型：HttpResponse<T>
- 分页：当支持分页时，响应头包含 x-continuation-token；可调用 response.next() 拉取下一页
- 常见形态：
  - /history/titles 返回包含 titles 数组的对象
  - /achievements?... 返回包含 achievements 数组的对象

示例（标题历史 /history/titles）：

```json
{
  "titles": [
    {
      "titleId": 1292135258,
      "name": "Halo Infinite",
      "displayImage": "https://images-eds.xboxlive.com/image.png",
      "platforms": ["XboxOne", "Scarlett"]
    }
  ]
}
```

示例（按 titleId 查询成就 /achievements）：

```json
{
  "achievements": [
    {
      "id": "1",
      "name": "First Steps",
      "description": "Complete the tutorial",
      "progressState": "Achieved",
      "progression": {
        "timeUnlocked": "2023-10-01T12:34:56Z"
      },
      "mediaAssets": [],
      "rewards": []
    }
  ]
}
```

## Example
```ts
import XboxWebApi from 'xbox-webapi'

async function listAchievements(uhs: string, xsts: string, xuid: string) {
  const api = new XboxWebApi({ uhs, token: xsts })
  const page = await api.providers.achievements.getAchievements(xuid, undefined, 20)
  console.log(page.data)

  try {
    const next = await page.next()
    console.log(next.data)
  } catch {
    // no more pages
  }
}
```

## Notes
- Returns HttpResponse<AchievementsResponse | AchievementsTitleResponse>
- Use response.next() to fetch the next page when continuationToken is present
