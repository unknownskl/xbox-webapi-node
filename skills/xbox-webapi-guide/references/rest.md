# rest

- Endpoint: dynamic (parsed from the provided URL)
- Description: Generic GET proxy; optionally specify x-xbl-contract-version and pagination params.

## Methods
- getRequest(url, xblContractVersion?, continuationToken?, maxItems?, skipItems?)
  - Parses URL to set host/path; writes xblContractVersion to header if provided

## Notes
- 返回类型：HttpResponse<any>
- 分页：若目标端点支持分页，将在响应头返回 x-continuation-token；可通过 response.next() 继续获取
- 通用字段：不同服务返回的 JSON 结构不同，请参考各对应 provider 文档
- 建议：调试时配合 x-xbl-contract-version 与 maxItems/skipItems 参数便于观察结构

示例（调用任意受支持端点）：

```ts
const res = await api.providers.rest.getRequest(
  'https://titlehub.xboxlive.com/users/xuid(2533274981234567)/titles/titlehistory/decoration/achievement,image'
)
console.log(res.data) // JSON 对象
console.log(res.headers['x-continuation-token']) // 分页令牌（如存在）
```
