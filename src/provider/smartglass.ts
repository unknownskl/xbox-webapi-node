import BaseProvider from './base'
import Uuid4 from 'uuid4'

export default class SmartglassProvider extends BaseProvider {
    _endpoint = 'xccs.xboxlive.com'
    _headers = {
        'x-xbl-contract-version': '4',
        'skillplatform': 'RemoteManagement'
    }

    async getConsolesList(): Promise<Console[]> {
        return (await this.get('/lists/devices?queryCurrentDevice=false&includeStorageDevices=true')).result
    }

    async getInstalledApps(consoleId:string): Promise<InstalledApp[]> {
        return (await this.get('/lists/installedApps?deviceId='+consoleId)).result
    }

    async getStorageDevices(consoleId:string): Promise<StorageDevice[]> {
        return (await this.get('/lists/storageDevices?deviceId='+consoleId)).result
    }

    async getConsoleStatus(consoleId:string): Promise<ConsoleStatus> {
        return (await this.get('/consoles/'+consoleId))
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

// Console
export interface Console {
    id:                                   string;
    name:                                 string;
    locale:                               string;
    region:                               string;
    consoleType:                          string;
    powerState:                           string;
    digitalAssistantRemoteControlEnabled: boolean;
    remoteManagementEnabled:              boolean;
    consoleStreamingEnabled:              boolean;
    wirelessWarning:                      boolean;
    outOfHomeWarning:                     boolean;
    storageDevices:                       StorageDevice[];
}

export interface StorageDevice {
    storageDeviceId:   string;
    storageDeviceName: string;
    isDefault:         boolean;
    freeSpaceBytes:    number;
    totalSpaceBytes:   number;
    isGen9Compatible:  null;
}

// ConsoleStatus
export interface ConsoleStatus {
    status:                               Status;
    id:                                   string;
    name:                                 string;
    locale:                               string;
    region:                               string;
    consoleType:                          string;
    powerState:                           string;
    playbackState:                        string;
    loginState:                           null;
    focusAppAumid:                        string;
    isTvConfigured:                       boolean;
    digitalAssistantRemoteControlEnabled: boolean;
    consoleStreamingEnabled:              boolean;
    remoteManagementEnabled:              boolean;
}

export interface Status {
    errorCode:    string;
    errorMessage: null;
}


// InstalledApp
export interface InstalledApp {
    oneStoreProductId: null | string;
    titleId:           number;
    aumid:             null | string;
    lastActiveTime:    Date | null;
    isGame:            boolean;
    name:              string;
    contentType:       ContentType;
    instanceId:        string;
    storageDeviceId:   string;
    uniqueId:          string;
    legacyProductId:   null | string;
    version:           number;
    sizeInBytes:       number;
    installTime:       Date;
    updateTime:        Date | null;
    parentId:          string | null;
}

export enum ContentType {
    App = "App",
    Dlc = "Dlc",
    Game = "Game",
}

// StorageDevice
export interface StorageDevice {
    storageDeviceId:   string;
    storageDeviceName: string;
    isDefault:         boolean;
    freeSpaceBytes:    number;
    totalSpaceBytes:   number;
    isGen9Compatible:  null;
}
