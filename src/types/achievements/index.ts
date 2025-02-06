import { PagingInfo } from '../paging'

export interface AchievementsResponse {
    titles:     Title[];
    pagingInfo: PagingInfo;
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
    WindowsOneCore = "WindowsOneCore",
    XboxOne = "XboxOne",
}

export enum TitleType {
    DGame = "DGame",
    Game = "Game",
    LiveApp = "LiveApp",
}

// TitleResponse

export interface AchievementsTitleResponse {
    achievements: Achievement[];
    pagingInfo:   PagingInfo;
}

export interface Achievement {
    id:                string;
    serviceConfigId:   string;
    name:              string;
    titleAssociations: TitleAssociation[];
    progressState:     ProgressState;
    progression:       Progression;
    mediaAssets:       MediaAsset[];
    platforms:         Platform[];
    isSecret:          boolean;
    description:       string;
    lockedDescription: string;
    productId:         string;
    achievementType:   AchievementType;
    participationType: ParticipationType;
    timeWindow:        null;
    rewards:           Reward[];
    estimatedTime:     string;
    deeplink:          string;
    isRevoked:         boolean;
}

export enum AchievementType {
    Persistent = "Persistent",
}

export interface MediaAsset {
    name: string;
    type: MediaAssetType;
    url:  string;
}

export enum MediaAssetType {
    Icon = "Icon",
}

export enum ParticipationType {
    Individual = "Individual",
}

export enum ProgressState {
    NotStarted = "NotStarted",
    Achieved = "Achieved",
}

export interface Progression {
    requirements: Requirement[];
    timeUnlocked: Date;
}

export interface Requirement {
    id:                    string;
    current:               null;
    target:                string;
    operationType:         OperationType;
    valueType:             RequirementValueType;
    ruleParticipationType: ParticipationType;
}

export enum OperationType {
    Sum = "SUM",
}

export enum RequirementValueType {
    Integer = "Integer",
}

export interface Reward {
    name:        null;
    description: null;
    value:       string;
    type:        RewardType;
    mediaAsset:  null;
    valueType:   RewardValueType;
}

export enum RewardType {
    Gamerscore = "Gamerscore",
}

export enum RewardValueType {
    Int = "Int",
}

export interface TitleAssociation {
    name: Name;
    id:   number;
}

export enum Name {
    Cuphead = "Cuphead",
}