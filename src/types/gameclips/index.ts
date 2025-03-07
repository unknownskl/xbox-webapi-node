import { PagingInfo } from '../paging'

export interface GameclipsResponse {
    values: Value[];
}

export interface Value {
    contentId:         string;
    contentLocators:   ContentLocator[];
    contentSegments:   ContentSegment[];
    creationType:      string;
    durationInSeconds: number;
    expirationDate:    Date;
    frameRate:         number;
    greatestMomentId:  string;
    localId:           string;
    ownerXuid:         number;
    resolutionHeight:  number;
    resolutionWidth:   number;
    sandboxId:         string;
    sharedTo:          any[];
    titleData:         string;
    titleId:           number;
    titleName:         string;
    uploadDate:        Date;
    uploadLanguage:    string;
    uploadRegion:      string;
    uploadTitleId:     number;
    uploadDeviceType:  string;
    userCaption:       string;
    commentCount:      number;
    likeCount:         number;
    shareCount:        number;
    viewCount:         number;
    contentState:      string;
    enforcementState:  string;
    safetyThreshold:   string;
    sessions:          any[];
    tournaments:       any[];
}

export interface ContentLocator {
    expiration?: Date;
    fileSize?:   number;
    locatorType: string;
    uri:         string;
}

export interface ContentSegment {
    segmentId:         number;
    creationType:      string;
    creatorChannelId:  null;
    creatorXuid:       number;
    recordDate:        Date;
    durationInSeconds: number;
    offset:            number;
    secondaryTitleId:  null;
    titleId:           number;
}
