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