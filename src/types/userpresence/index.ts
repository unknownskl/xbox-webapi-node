export interface UserResponse {
    xuid:      string;
    state:     State;
    lastSeen?: LastSeen;
    devices?:  Device[];
}

export interface Device {
    type:   string;
    titles: Title[];
}

export interface Title {
    id:           string;
    name:         string;
    placement:    string;
    state:        string;
    lastModified: Date;
    activity?:    Activity;
}

export interface Activity {
    richPresence: string;
}

export interface LastSeen {
    deviceType: string;
    titleId:    string;
    titleName:  string;
    timestamp:  Date;
}

export enum State {
    Offline = "Offline",
    Online = "Online",
}
