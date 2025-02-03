export interface StorageDevice {
    storageDeviceId:   string;
    storageDeviceName: string;
    isDefault:         boolean;
    freeSpaceBytes:    number;
    totalSpaceBytes:   number;
    isGen9Compatible:  null;
}
