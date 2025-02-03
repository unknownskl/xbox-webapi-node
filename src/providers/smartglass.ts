import BaseProvider from './base'
import Uuid4 from 'uuid4'

export default class SmartglassProvider extends BaseProvider {
    _endpoint = 'xccs.xboxlive.com'
    _headers = {
        'x-xbl-contract-version': '4',
        'skillplatform': 'RemoteManagement'
    }

    async getConsolesList() {
        const consoles = await this.get('/lists/devices?queryCurrentDevice=false&includeStorageDevices=true')
        return consoles.result
    }

    async powerOn(consoleId:string) {
        return this._sendCommand(consoleId, 'Power', 'WakeUp')
    }

    async powerOff(consoleId:string) {
        return this._sendCommand(consoleId, 'Power', 'TurnOff')
    }

    async launchOneGuide(consoleId:string) {
        return this._sendCommand(consoleId, 'TV', 'ShowGuide')
    }

    _sendCommand(consoleId, commandType, command, params?){
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