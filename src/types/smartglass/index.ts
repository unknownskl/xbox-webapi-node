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

export interface StorageDevice {
    storageDeviceId:   string;
    storageDeviceName: string;
    isDefault:         boolean;
    freeSpaceBytes:    number;
    totalSpaceBytes:   number;
    isGen9Compatible:  null;
}