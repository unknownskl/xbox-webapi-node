export interface TitleHistoryResponse {
    xuid:   string;
    titles: Title[];
}

export interface Title {
    titleId:               string;
    pfn:                   null | string;
    bingId:                null | string;
    serviceConfigId?:      string;
    windowsPhoneProductId: null;
    name:                  string;
    type:                  TitleType;
    devices:               Device[];
    displayImage:          null | string;
    mediaItemType:         MediaItemType;
    modernTitleId:         null | string;
    isBundle:              boolean;
    achievement:           Achievement;
    stats:                 null;
    gamePass:              null;
    images:                Image[];
    titleHistory:          TitleHistory;
    titleRecord:           null;
    detail:                null;
    friendsWhoPlayed:      null;
    alternateTitleIds:     null;
    contentBoards:         null;
    xboxLiveTier:          XboxLiveTier;
    isStreamable?:         boolean;
}

export interface Achievement {
    currentAchievements: number;
    totalAchievements:   number;
    currentGamerscore:   number;
    totalGamerscore:     number;
    progressPercentage:  number;
    sourceVersion:       number;
}

export enum Device {
    IOS = "iOS",
    Mobile = "Mobile",
    NintendoSwitch = "Nintendo Switch",
    PC = "PC",
    Win32 = "Win32",
    Xbox360 = "Xbox360",
    XboxOne = "XboxOne",
    XboxSeries = "XboxSeries",
}

export interface Image {
    url:     string;
    type:    ImageType;
    caption: null | string;
}

export enum ImageType {
    BoxArt = "BoxArt",
    BrandedKeyArt = "BrandedKeyArt",
    FeaturePromotionalSquareArt = "FeaturePromotionalSquareArt",
    Hero = "Hero",
    Image = "Image",
    ImageGallery = "ImageGallery",
    Logo = "Logo",
    Poster = "Poster",
    Screenshot = "Screenshot",
    SellImage = "SellImage",
    SuperHeroArt = "SuperHeroArt",
    Thumbnail = "Thumbnail",
    Tile = "Tile",
    TitledHeroArt = "TitledHeroArt",
    WideBackgroundImage = "WideBackgroundImage",
}

export enum MediaItemType {
    Application = "Application",
    Xbox360Game = "Xbox360Game",
    XboxArcadeGame = "XboxArcadeGame",
    XboxOriginalGame = "XboxOriginalGame",
}

export interface TitleHistory {
    lastTimePlayed: Date;
    visible:        boolean;
    canHide:        boolean;
}

export enum TitleType {
    Game = "Game",
}

export enum XboxLiveTier {
    Full = "Full",
    None = "None",
    Open = "Open",
}
