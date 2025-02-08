import { PagingInfo } from '../paging'

export interface GameclipsResponse {
    gameClips:  GameClip[];
    pagingInfo: PagingInfo;
}

export interface GameClip {
    gameClipId:            string;
    state:                 number;
    datePublished:         Date;
    dateRecorded:          Date;
    lastModified:          Date;
    userCaption:           string;
    type:                  number;
    durationInSeconds:     number;
    scid:                  string;
    titleId:               number;
    rating:                number;
    ratingCount:           number;
    views:                 number;
    titleData:             string;
    systemProperties:      string;
    savedByUser:           boolean;
    achievementId:         string;
    greatestMomentId:      string;
    thumbnails:            Thumbnail[];
    gameClipUris:          GameClipUris[];
    xuid:                  string;
    clipName:              string;
    titleName:             string;
    gameClipLocale:        string;
    clipContentAttributes: number;
    deviceType:            DeviceType;
    commentCount:          number;
    likeCount:             number;
    shareCount:            number;
    partialViews:          number;
}

export enum DeviceType {
    Durango = "Durango",
    Edmonton = "Edmonton",
    Scarlett = "Scarlett",
    Scorpio = "Scorpio",
}

export interface GameClipUris {
    uri:        string;
    fileSize:   number;
    uriType:    number;
    expiration: Date;
}

export interface Thumbnail {
    uri:           string;
    fileSize:      number;
    thumbnailType: number;
}