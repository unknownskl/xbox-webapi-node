# smartglass

- Endpoint: xccs.xboxlive.com
- Headers: x-xbl-contract-version = 4, skillplatform = RemoteManagement
- Description: Control console, query status, apps and storage devices.

## Methods
- getConsolesList()
  - GET /lists/devices?queryCurrentDevice=false&includeStorageDevices=true
- getInstalledApps(consoleId)
  - GET /lists/installedApps?deviceId={consoleId}
- getStorageDevices(consoleId)
  - GET /lists/storageDevices?deviceId={consoleId}
- getConsoleStatus(consoleId)
  - GET /consoles/{consoleId}
- powerOn(consoleId?)
  - POST /commands (Power: WakeUp)
- powerOff(consoleId?)
  - POST /commands (Power: TurnOff)
- launchOneGuide(consoleId)
  - POST /commands (TV: ShowGuide)

## Parameters
- consoleId?: string — Target console ID (optional for power commands; uses default if configured)

## 返回值
- 返回类型：HttpResponse<SmartglassResponse<App | Console | StorageDevice> | ConsoleStatus | any>
- 形态：
  - getConsolesList：返回 devices 数组（设备 ID、名称、电源状态、存储设备等）
  - getConsoleStatus：返回单个主机状态（电源、网络、活动标题等）
  - commands（powerOn/powerOff/launchOneGuide）：返回命令受理/执行状态
- 常见字段：
  - devices[].deviceId / name / powerState
  - devices[].storageDevices[]（id/name/totalBytes/freeBytes）
  - consoleStatus.powerState / activeTitles[] / inputSource

示例（设备列表简化）：

```json
{
  "devices": [
    {
      "deviceId": "Console:1234567890",
      "name": "Living Room Xbox",
      "powerState": "Connected",
      "storageDevices": [
        { "id": "HDD", "name": "Internal", "totalBytes": 1000000000, "freeBytes": 500000000 }
      ]
    }
  ]
}
```

示例（状态简化）：

```json
{
  "powerState": "On",
  "activeTitles": [
    { "titleId": 1292135258, "name": "Halo Infinite" }
  ],
  "inputSource": "HDMI"
}
```

## Example
```ts
import XboxWebApi from 'xbox-webapi'

async function powerOn(uhs: string, xsts: string, consoleId: string) {
  const api = new XboxWebApi({ uhs, token: xsts })
  await api.providers.smartglass.powerOn(consoleId)
}
```

## Notes
- Returns HttpResponse<SmartglassResponse<App | Console | StorageDevice> | ConsoleStatus | any>
