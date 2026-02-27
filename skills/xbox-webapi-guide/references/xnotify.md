# xnotify

- Endpoint: xnotify.xboxlive.com
- Description: Xbox Live service status.

## Methods
- getLiveStatus()
  - GET /servicestatusv6/GB/en-GB

## 返回值
- 返回类型：HttpResponse<StatusResponse>
- 形态：服务状态列表，含服务名、当前状态、影响范围与消息
- 常见字段：
  - services[].id / name / status（Up/Down/Degraded）
  - services[].message / impactedPlatforms[]

示例（简化）：

```json
{
  "services": [
    {
      "id": "xbox-live-core-services",
      "name": "Xbox Live Core Services",
      "status": "Up",
      "message": "All services are running normally",
      "impactedPlatforms": ["XboxOne", "Windows10"]
    }
  ]
}
```

## Notes
- Returns HttpResponse<StatusResponse>
