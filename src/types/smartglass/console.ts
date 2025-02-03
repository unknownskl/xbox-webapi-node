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