# screenshots

- Endpoint: mediahub.xboxlive.com
- Contract: x-xbl-contract-version = 3
- Description: Query user screenshots. Supports pagination.

## Methods
- getScreenshots(xuid, continuationToken?, maxItems?, skipItems?)
-  - POST /screenshots/search (Body: { query: "OwnerXuid eq {xuid}", max?, skip? })

## Parameters
- xuid: string — Owner XUID
- continuationToken?: string — Continue pagination
- maxItems?: number — Page size (also used in body as max)
- skipItems?: number — Offset (also used in body as skip)

## 返回值
- 返回类型：HttpResponse<ScreenshotsResponse>
- 常见字段：
  - screenshots：数组，每项代表一个截图
  - screenshots[].screenshotId：唯一标识
  - screenshots[].titleId / xuid / state / datePublished
  - screenshots[].thumbnails[]：缩略图 uri 列表
  - screenshots[].screenshotUris[]：图片文件 uri 列表（含 fileType）
- 分页：响应头可包含 x-continuation-token；可通过 response.next() 获取下一页

示例：

```json
{
  "screenshots": [
    {
      "screenshotId": "7f4d2b1c-0000-0000-0000-000000000000",
      "titleId": 1292135258,
      "xuid": "2533274981234567",
      "state": "Published",
      "datePublished": "2023-09-30T11:22:33Z",
      "thumbnails": [
        { "uri": "https://shots.xboxlive.com/thumb.jpg" }
      ],
      "screenshotUris": [
        { "uri": "https://shots.xboxlive.com/shot.jpg", "fileType": "jpg" }
      ]
    }
  ]
}
```

## Example
```ts
import XboxWebApi from 'xbox-webapi'

async function listScreenshots(uhs: string, xsts: string, xuid: string) {
  const api = new XboxWebApi({ uhs, token: xsts })
  const shots = await api.providers.screenshots.getScreenshots(xuid, undefined, 20)
  console.log(shots.data)
}
```

## Notes
- Returns HttpResponse<ScreenshotsResponse>
- response.next() fetches the next page
