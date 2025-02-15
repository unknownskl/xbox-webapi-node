export interface PinsResponse {
    ImpressionId: string;
    ListItems:    ListItem[];
    ListMetadata: ListMetadata;
}

export interface ListItem {
    DateAdded:    string;
    DateModified: string;
    Index:        number;
    KValue:       number;
    Item:         Item;
}

export interface Item {
    ContentType: ContentType;
    ItemId:      string;
    Title:       string;
    DeviceType:  DeviceType;
    Provider:    null;
    ProviderId:  null;
}

export enum ContentType {
    DApp = "DApp",
    DGame = "DGame",
}

export enum DeviceType {
    XboxOne = "XboxOne",
}

export interface ListMetadata {
    ListTitle:       string;
    ListVersion:     number;
    ListCount:       number;
    AllowDuplicates: boolean;
    MaxListSize:     number;
    AccessSetting:   string;
}
