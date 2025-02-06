export interface AchievementsResponse {
    titles:     Title[];
    pagingInfo: PagingInfo;
}

export interface PagingInfo {
    continuationToken: string;
    totalRecords:      number;
}

export interface Title {
    lastUnlock:         Date;
    titleId:            number;
    serviceConfigId:    string;
    titleType:          TitleType;
    platform:           Platform;
    name:               string;
    earnedAchievements: number;
    currentGamerscore:  number;
    maxGamerscore:      number;
}

export enum Platform {
    Durango = "Durango",
    XboxOne = "XboxOne",
}

export enum TitleType {
    DGame = "DGame",
    Game = "Game",
    LiveApp = "LiveApp",
}
