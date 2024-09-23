import BaseProvider from './base'
const Debug = require('debug')('xbox-webapi-node:provider_smartglass')
const Uuid4 = require('uuid4')

export default class SmartglassProvider extends BaseProvider {
    _endpoint = 'https://xccs.xboxlive.com'
    _headers = {
        'x-xbl-contract-version': '4',
        'skillplatform': 'RemoteManagement'
    }

    getConsolesList(){
        Debug('getConsolesList()')

        return this.get('/lists/devices?queryCurrentDevice=false&includeStorageDevices=true')
    }

    getInstalledApps(consoleId:string){
        Debug('getInstalledApps('+consoleId+')')

        return this.get('/lists/installedApps?deviceId='+consoleId)
    }

    getStorageDevices(consoleId:string){
        Debug('getStorageDevices('+consoleId+')')

        return this.get('/lists/storageDevices?deviceId='+consoleId)
    }

    getConsoleStatus(consoleId:string){
        Debug('getConsoleStatus('+consoleId+')')

        return this.get('/consoles/'+consoleId)
    }

    powerOn(consoleId:string){
        Debug('powerOn('+consoleId+')')

        return this._sendCommand(consoleId, 'Power', 'WakeUp')
    }

    powerOff(consoleId:string){
        Debug('powerOff('+consoleId+')')

        return this._sendCommand(consoleId, 'Power', 'TurnOff')
    }

    reboot(consoleId:string){
        Debug('reboot('+consoleId+')')

        return this._sendCommand(consoleId, 'Power', 'Reboot')
    }

    mute(consoleId:string){
        Debug('mute('+consoleId+')')

        return this._sendCommand(consoleId, 'Audio', 'Mute')
    }

    unmute(consoleId:string){
        Debug('unmute('+consoleId+')')

        return this._sendCommand(consoleId, 'Audio', 'Unmute')
    }

    launchDashboard(consoleId:string){
        Debug('launchDashboard('+consoleId+')')

        return this._sendCommand(consoleId, 'Shell', 'GoHome')
    }

    launchOneGuide(consoleId:string){
        Debug('launchOneGuide('+consoleId+')')

        return this._sendCommand(consoleId, 'TV', 'ShowGuide')
    }

    launchApp(consoleId:string, titleId:string){
        Debug('launchApp('+consoleId, titleId+')')

        return this._sendCommand(consoleId, 'Shell', 'ActivateApplicationWithOneStoreProductId', [{
            'oneStoreProductId': titleId
        }])
    }

    sendButtonPress(consoleId:string, button:string){
        Debug('sendButtonPress('+consoleId, button+')')

        return this._sendCommand(consoleId, 'Shell', 'InjectKey', [{
            'keyType': button
        }])
    }

    openGuideTab(consoleId:string){
        Debug('openGuideTab('+consoleId+')')

        return this._sendCommand(consoleId, 'Shell', 'ShowGuideTab', [{
            'tabName': 'Guide'
        }])
    }

    _sendCommand(consoleId:string, commandType:string, command:string, params?:object){
        Debug('_sendCommand('+consoleId, commandType, command, params+')')

        if(params == undefined){
            params = []
        }

        var session_id = Uuid4()
        // var session_id = '2c1f6eae-30f1-4b03-81bf-ff11f4e02079'

        var postParams = {
            "destination": "Xbox",
            "type": commandType,
            "command": command,
            "sessionId": session_id,
            "sourceId": "com.microsoft.smartglass",
            "parameters": params,
            "linkedXboxId": consoleId,
        }

        var postData = JSON.stringify(postParams)

        return this.post('/commands', postData)
    }
}