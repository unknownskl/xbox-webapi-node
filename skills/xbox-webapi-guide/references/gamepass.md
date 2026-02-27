# gamepass

- Endpoint: catalog.gamepass.com
- Headers: MS-CV = 1.0, calling-app-name/version preset
- Description: Query Game Pass SIGL and product information.

## Methods
- getSigl(siglId, market='us', language='en-us')
  - GET /sigls/v2?id={siglId}&market={market}&language={language}
- getProducts(products: string[], market='us', language='en-us')
-  - POST /v3/products?market={market}&language={language} (Body: { Products: [...] })
- getProductsDetailed(products: string[])
-  - POST /v3/products (hydration = RemoteHighSapphire0; ≤ 20 products per request)

## Parameters
- siglId: string — SIGL identifier
- products: string[] — Product IDs to hydrate
- market?: string — Region (default 'us')
- language?: string — Locale (default 'en-us')

## 返回值
- 返回类型：HttpResponse<SiglResponse | ProductsResponse | any>
- 常见形态：
  - SIGL（/sigls/...）：包含产品集合或清单的对象（如包含产品 ID 列表、分组/分区信息）
  - Products（/v3/products）：返回 Products 数组，含基本信息与可用性（Availabilities）
- 注：getProductsDetailed 会返回更完整的 hydration 字段（如 Offers、Media、Tags 等）

示例（SIGL 简化）：

```json
{
  "Sigl": {
    "Id": "f4c9b1e7-0000-0000-0000-000000000000",
    "Market": "US",
    "Language": "en-us",
    "IncludedProductIds": ["9NKX70BBCDRN", "9P8CP1Q7PS4N"]
  }
}
```

示例（Products 简化）：

```json
{
  "Products": [
    {
      "ProductId": "9NKX70BBCDRN",
      "LocalizedProperties": [
        { "ProductTitle": "Forza Horizon 5" }
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

async function getSigl(uhs: string, xsts: string, siglId: string) {
  const api = new XboxWebApi({ uhs, token: xsts })
  const res = await api.providers.gamepass.getSigl(siglId, 'us', 'en-us')
  console.log(res.data)
}
```

## Notes
- Returns HttpResponse<SiglResponse | ProductsResponse | any>
