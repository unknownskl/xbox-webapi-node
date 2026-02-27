# gameclips

- Endpoint: mediahub.xboxlive.com
- Contract: x-xbl-contract-version = 3
- Description: Query user game clips. Supports pagination.

## Methods
- getGameclips(xuid, continuationToken?, maxItems?, skipItems?)
-  - POST /gameclips/search (Body: { query: "OwnerXuid eq {xuid}", max?, skip? })

## Parameters
- xuid: string — Owner XUID
- continuationToken?: string — Continue pagination
- maxItems?: number — Page size (also used in body as max)
- skipItems?: number — Offset (also used in body as skip)

## 返回值
- 返回类型：HttpResponse<GameclipsResponse>
- 常见字段：
  - gameClips：数组，每项代表一个录制片段
  - gameClips[].gameClipId：唯一标识
  - gameClips[].titleId / xuid / state / datePublished
  - gameClips[].thumbnails[]：缩略图 uri 列表
  - gameClips[].gameClipUris[]：视频文件 uri 列表（含 fileType）
- 分页：响应头可包含 x-continuation-token；可通过 response.next() 获取下一页

示例：

```json
{
  "gameClips": [
    {
      "gameClipId": "3d6f9a0a-0000-0000-0000-000000000000",
      "titleId": 1292135258,
      "xuid": "2533274981234567",
      "state": "Published",
      "datePublished": "2023-10-01T12:34:56Z",
      "thumbnails": [
        { "uri": "https://clips.xboxlive.com/thumb.jpg" }
      ],
      "gameClipUris": [
        { "uri": "https://clips.xboxlive.com/clip.mp4", "fileType": "mp4" }
      ]
    }
  ]
}
```

## Example
```ts
import XboxWebApi from 'xbox-webapi'

async function listClips(uhs: string, xsts: string, xuid: string) {
  const api = new XboxWebApi({ uhs, token: xsts })
  const clips = await api.providers.gameclips.getGameclips(xuid, undefined, 20)
  console.log(clips.data)
}
```

## Notes
- Returns HttpResponse<GameclipsResponse>
- response.next() fetches the next page
