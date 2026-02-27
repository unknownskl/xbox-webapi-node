# catalog

- Endpoint: displaycatalog.mp.microsoft.com
- Headers: MS-CV = 1.0
- Description: Store catalog search and product info, supports market/language parameters.

## Methods
- searchTitle(query, market='us', language='en-us', continuationToken?, maxItems?, skipItems?)
  - GET /v7.0/productFamilies/autosuggest?…
- getProductId(query, market='us', language='en-us', continuationToken?, maxItems?, skipItems?)
  - GET /v7.0/productFamilies/autosuggest?…
- getProductFromAlternateId(titleId, titleType, market='us', language='en-us', continuationToken?, maxItems?, skipItems?)
  - GET /v7.0/productFamilies/autosuggest?…

## Parameters
- query: string — Search keyword or product bigId
- titleId: string — Alternate identifier value
- titleType: string — Alternate identifier type
- market?: string — Region (default 'us')
- language?: string — Locale (default 'en-us')
- continuationToken?: string — Continue pagination
- maxItems?: number — Page size
- skipItems?: number — Offset

## 返回值
- 返回类型：HttpResponse<CatalogResponse>
- 常见字段：
  - Products：产品列表，包含 ProductId、LocalizedProperties、Images、DisplaySkuAvailabilities 等
  - Items：在 autosuggest 场景下为建议项数组，包含 Title/ProductId/ImageUrl 等
- 分页：多数 autosuggest 接口一次性返回；若提供 max/skip，将以分页形式返回相应范围

示例（autosuggest 简化）：

```json
{
  "Items": [
    {
      "Title": "Forza Horizon 5",
      "ProductId": "9NKX70BBCDRN",
      "ImageUrl": "https://store-images.microsoft.com/boxart.png"
    }
  ]
}
```

示例（产品信息简化）：

```json
{
  "Products": [
    {
      "ProductId": "9NKX70BBCDRN",
      "LocalizedProperties": [
        { "ProductTitle": "Forza Horizon 5" }
      ],
      "Images": [
        { "Uri": "https://store-images.microsoft.com/boxart.png", "ImagePurpose": "BoxArt" }
      ],
      "DisplaySkuAvailabilities": [
        {
          "Sku": { "SkuId": "0000" },
          "Availabilities": [
            { "Actions": ["Purchase"], "Market": "US" }
          ]
        }
      ]
    }
  ]
}
```

## Example
```ts
import XboxWebApi from 'xbox-webapi'

async function searchCatalog(uhs: string, xsts: string) {
  const api = new XboxWebApi({ uhs, token: xsts })
  const res = await api.providers.catalog.searchTitle('Forza', 'us', 'en-us', undefined, 25)
  console.log(res.data)
}
```

## Notes
- Calls resetDefaultHeaders() to remove default auth headers; this domain typically does not require XBL3 contract headers.
