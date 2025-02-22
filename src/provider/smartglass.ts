import { HttpResponse } from '../lib/http'
import { SmartglassResponse, Console, ConsoleStatus, App, StorageDevice } from '../types/smartglass'

import BaseProvider from './base'
import Uuid4 from 'uuid4'

export default class SmartglassProvider extends BaseProvider {
    _endpoint = 'xccs.xboxlive.com'
    _headers = {
        'x-xbl-contract-version': '4',
        'skillplatform': 'RemoteManagement'
    }

    async getConsolesList(): Promise<HttpResponse<SmartglassResponse<Console>>> {
        return (await this.get('/lists/devices?queryCurrentDevice=false&includeStorageDevices=true'))
    }

    async getInstalledApps(consoleId:string): Promise<HttpResponse<SmartglassResponse<App>>> {
        return (await this.get('/lists/installedApps?deviceId='+consoleId))
    }

    async getStorageDevices(consoleId:string): Promise<HttpResponse<SmartglassResponse<StorageDevice>>> {
        return (await this.get('/lists/storageDevices?deviceId='+consoleId))
    }

    async getConsoleStatus(consoleId:string): Promise<HttpResponse<ConsoleStatus>> {
        return (await this.get('/consoles/'+consoleId))
    }




    async powerOn(consoleId?:string) {
        return this._sendCommand(consoleId, 'Power', 'WakeUp')
    }

    async powerOff(consoleId?:string) {
        return this._sendCommand(consoleId, 'Power', 'TurnOff')
    }

    async launchOneGuide(consoleId:string) {
        return this._sendCommand(consoleId, 'TV', 'ShowGuide')
    }

    _sendCommand(consoleId, commandType, command, params?){
        if(params == undefined){
            params = []
        }

        const session_id = Uuid4()
        // var session_id = '2c1f6eae-30f1-4b03-81bf-ff11f4e02079'

        const postParams = {
            "destination": "Xbox",
            "type": commandType,
            "command": command,
            "sessionId": session_id,
            "sourceId": "com.microsoft.smartglass",
            "parameters": params,
            "linkedXboxId": consoleId,
        }

        const postData = JSON.stringify(postParams)

        return this.post('/commands', postData)
    }
}