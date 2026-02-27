# titlehub

- Endpoint: titlehub.xboxlive.com
- Description: User title history and specific title details (with decoration fields).

## Methods
- getTitleHistory(xuid)
  - GET /users/xuid({xuid})/titles/titlehistory/decoration/{achievement,image,scid}
- getTitleId(xuid, titleId)
  - GET /users/xuid({xuid})/titles/titleid({titleId})/decoration/{achievement,image,detail,scid,alternateTitleId}

## Parameters
- xuid: string — Target user XUID
- titleId: string — Xbox title ID

## 返回值
- 返回类型：HttpResponse<TitleHistoryResponse>
- 形态：顶层包含 titles 数组；根据 decoration 携带成就、图片、细节等子字段
- 常见字段：
  - titleId：数值型 Title ID
  - name：标题名称
  - type：Title 类型（Game/App 等）
  - devices：支持设备
  - images：图片数组（type/url/width/height）
  - achievement：当前/总成就与分数统计

示例（历史列表，含装饰字段）：

```json
{
  "titles": [
    {
      "titleId": 1292135258,
      "name": "Halo Infinite",
      "type": "Game",
      "devices": ["XboxOne"],
      "images": [
        {
          "type": "BoxArt",
          "url": "https://images-eds.xboxlive.com/image.png",
          "width": 1080,
          "height": 1080
        }
      ],
      "achievement": {
        "currentAchievements": 10,
        "totalAchievements": 119,
        "currentGamerscore": 200,
        "totalGamerscore": 1600
      }
    }
  ]
}
```

## Example
```ts
import XboxWebApi from 'xbox-webapi'

async function history(uhs: string, xsts: string, xuid: string) {
  const api = new XboxWebApi({ uhs, token: xsts })
  const res = await api.providers.titlehub.getTitleHistory(xuid)
  console.log(res.data)
}
```

## Notes
- Returns HttpResponse<TitleHistoryResponse>
