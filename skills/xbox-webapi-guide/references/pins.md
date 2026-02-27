# pins

- Endpoint: eplists.xboxlive.com
- Description: User PINS lists (including default XBLPins and SaveForLater).

## Methods
- getPins(xuid, listname='XBLPins')
  - GET /users/xuid({xuid})/lists/PINS/{listname}
- getSavedForLater(xuid)
  - Alias of getPins(xuid, 'SaveForLater')

## Parameters
- xuid: string — Target user XUID
- listname?: string — List name (default 'XBLPins')

## 返回值
- 返回类型：HttpResponse<PinsResponse>
- 形态：顶层包含 Items 数组；每个 Item 含 Id、ItemType、ItemState 与 Properties
- 常见字段：
  - Items[].Properties.TitleId / ContentId / ContentType / Name
  - Items[].Properties.Images[]（Uri/Purpose）
- 列表示例：XBLPins（默认）、SaveForLater

示例（简化）：

```json
{
  "Items": [
    {
      "Id": "pin-0001",
      "ItemType": "Game",
      "ItemState": "Active",
      "Properties": {
        "TitleId": 1292135258,
        "ContentId": "9NKX70BBCDRN",
        "ContentType": "Product",
        "Name": "Halo Infinite",
        "Images": [
          { "Uri": "https://images-eds.xboxlive.com/boxart.png", "Purpose": "BoxArt" }
        ]
      }
    }
  ]
}
```

## Example
```ts
import XboxWebApi from 'xbox-webapi'

async function listPins(uhs: string, xsts: string, xuid: string) {
  const api = new XboxWebApi({ uhs, token: xsts })
  const res = await api.providers.pins.getPins(xuid)
  console.log(res.data)
}
```

## Notes
- Returns HttpResponse<PinsResponse>
