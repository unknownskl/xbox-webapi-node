const BaseProvider = require('./base.js')
const Debug = require('debug')('xbox-webapi-node:provider_smartglass')
const Uuid4 = require('uuid4')

module.exports = function(client){

    var provider = BaseProvider(client, 'smartglass')
    provider._endpoint = 'https://xccs.xboxlive.com'

    provider._headers['x-xbl-contract-version'] = 4
    provider._headers['skillplatform'] = 'RemoteManagement'

    provider.getConsolesList = function(){
        Debug('getConsolesList()')

        return this.get('/lists/devices?queryCurrentDevice=false&includeStorageDevices=true')
    }

    provider.getInstalledApps = function(consoleId){
        Debug('getInstalledApps('+consoleId+')')

        return this.get('/lists/installedApps?deviceId='+consoleId)
    }

    provider.getStorageDevices = function(consoleId){
        Debug('getStorageDevices('+consoleId+')')

        return this.get('/lists/storageDevices?deviceId='+consoleId)
    }

    provider.getConsoleStatus = function(consoleId){
        Debug('getConsoleStatus('+consoleId+')')

        return this.get('/consoles/'+consoleId)
    }

    provider.powerOn = function(consoleId){
        Debug('powerOn('+consoleId+')')

        return this._sendCommand(consoleId, 'Power', 'WakeUp')
    }

    provider.powerOff = function(consoleId){
        Debug('powerOff('+consoleId+')')

        return this._sendCommand(consoleId, 'Power', 'TurnOff')
    }

    provider.reboot = function(consoleId){
        Debug('reboot('+consoleId+')')

        return this._sendCommand(consoleId, 'Power', 'Reboot')
    }

    provider.mute = function(consoleId){
        Debug('mute('+consoleId+')')

        return this._sendCommand(consoleId, 'Audio', 'Mute')
    }

    provider.unmute = function(consoleId){
        Debug('unmute('+consoleId+')')

        return this._sendCommand(consoleId, 'Audio', 'Unmute')
    }

    provider.launchDashboard = function(consoleId){
        Debug('launchDashboard('+consoleId+')')

        return this._sendCommand(consoleId, 'Shell', 'GoHome')
    }

    provider.launchOneGuide = function(consoleId){
        Debug('launchOneGuide('+consoleId+')')

        return this._sendCommand(consoleId, 'TV', 'ShowGuide')
    }

    provider.launchApp = function(consoleId, titleId){
        Debug('launchApp('+consoleId, titleId+')')

        return this._sendCommand(consoleId, 'Shell', 'ActivateApplicationWithOneStoreProductId', [{
            'oneStoreProductId': titleId
        }])
    }

    provider.sendButtonPress = function(consoleId, button){
        Debug('sendButtonPress('+consoleId, button+')')

        return this._sendCommand(consoleId, 'Shell', 'InjectKey', [{
            'keyType': button
        }])
    }

    provider.openGuideTab = function(consoleId){
        Debug('openGuideTab('+consoleId+')')

        return this._sendCommand(consoleId, 'Shell', 'ShowGuideTab', [{
            'tabName': 'Guide'
        }])
    }

    provider._sendCommand = function(consoleId, commandType, command, params){
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

    return provider
}