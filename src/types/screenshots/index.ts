export interface ScreenshotsResponse {
    values: Value[];
}

export interface Value {
    captureDate:      Date;
    contentId:        string;
    contentLocators:  ContentLocator[];
    CreationType:     string;
    expirationDate:   Date;
    localId:          string;
    ownerXuid:        number;
    resolutionHeight: number;
    resolutionWidth:  number;
    sandboxId:        string;
    sharedTo:         any[];
    titleId:          number;
    titleName:        string;
    dateUploaded:     Date;
    uploadLanguage:   string;
    uploadRegion:     string;
    uploadTitleId:    number;
    uploadDeviceType: string;
    commentCount:     number;
    likeCount:        number;
    shareCount:       number;
    viewCount:        number;
    contentState:     string;
    enforcementState: string;
    safetyThreshold:  string;
    sessions:         any[];
    tournaments:      any[];
}

export interface ContentLocator {
    fileSize?:   number;
    locatorType: string;
    uri:         string;
}
