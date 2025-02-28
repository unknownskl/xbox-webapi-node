export type SiglResponse = [SiglHeader, ...SiglProduct[]];

export interface SiglHeader {
    siglId:            string;
    title:             string;
    description:       string;
    requiresShuffling: string;
    imageUrl:          string;
}

export interface SiglProduct {
    id: string;
}


export interface ProductsResponse {
    Products:   { [key: string]: Product };
    InvalidIds: any[];
}

export interface Product {
    alternateIds:                    AlternateID[];
    productKind:                     ProductKind;
    name:                            string;
    developerName?:                  string;
    publisherName:                   string;
    tileImage:                       Image;
    posterImage:                     Image;
    heroImage?:                      Image;
    releaseDate:                     Date;
    consoleComingSoonDate?:          Date;
    gamePassStandardComingSoonDate?: Date;
    isEAPlay:                        boolean;
    xCloudIsStreamable:              boolean;
    xCloudSupportsTouch:             boolean;
    xCloudPrograms?:                 XCloudProgram[];
    capabilities?:                   Capability[];
    categories:                      Category[];
    availablePlatforms:              AvailablePlatform[];
    isBundle:                        boolean;
    StoreId:                         string;
    pcComingSoonDate?:               Date;
    eaConsoleComingSoonDate?:        Date;
    gamePassCoreComingSoonDate?:     Date;
    consoleCrossGenSiblings?:        string[];
    gameCatalogExtensionId?:         string;
}

export interface AlternateID {
    idType: IDType;
    id:     string[] | string;
}

export enum IDType {
    Childxboxtitleids = "CHILDXBOXTITLEIDS",
    Xboxtitleid = "XBOXTITLEID",
    Xcloudtitleid = "XCLOUDTITLEID",
}

export enum AvailablePlatform {
    Hub = "Hub",
    MobileDevice = "MobileDevice",
    PC = "PC",
    XCloud = "XCloud",
    XboxOne = "XboxOne",
    XboxSeriesX = "XboxSeriesX",
}

export interface Capability {
    id:                   IDEnum;
    name:                 string;
    applicablePlatforms?: ApplicablePlatform[];
}

export enum ApplicablePlatform {
    Desktop = "Desktop",
    Xbox = "Xbox",
}

export enum IDEnum {
    Capability4K = "Capability4k",
    CapabilityHDR = "CapabilityHDR",
    CapabilityVRR = "CapabilityVRR",
    CapabilityXboxEnhanced = "CapabilityXboxEnhanced",
    ConsoleCrossGen = "ConsoleCrossGen",
    ConsoleGen9Optimized = "ConsoleGen9Optimized",
    ConsoleKeyboardMouse = "ConsoleKeyboardMouse",
    CoopSupportLocal = "CoopSupportLocal",
    CoopSupportOnline = "CoopSupportOnline",
    DolbyAtmos = "DolbyAtmos",
    Dtsx = "DTSX",
    FPSBoostEnabledX = "FPSBoostEnabledX",
    FPSBoostEnabledXS = "FPSBoostEnabledXS",
    GameStreaming = "GameStreaming",
    LocalMultiplayer = "LocalMultiplayer",
    OnlineMultiplayerWithGold = "OnlineMultiplayerWithGold",
    PCGamePad = "PcGamePad",
    RayTracing = "RayTracing",
    SharedSplitScreen = "SharedSplitScreen",
    SinglePlayer = "SinglePlayer",
    SpatialSound = "SpatialSound",
    The120FPS = "120fps",
    The60FPS = "60fps",
    XblAchievements = "XblAchievements",
    XblCloudSaves = "XblCloudSaves",
    XblClubs = "XblClubs",
    XblCrossPlatformCoop = "XblCrossPlatformCoop",
    XblCrossPlatformMultiPlayer = "XblCrossPlatformMultiPlayer",
    XblLocalCoop = "XblLocalCoop",
    XblLocalMultiPlayer = "XblLocalMultiPlayer",
    XblOnlineCoop = "XblOnlineCoop",
    XblOnlineMultiPlayer = "XblOnlineMultiPlayer",
    XblPresence = "XblPresence",
    XboxLiveCrossGenMP = "XboxLiveCrossGenMP",
    Xpa = "XPA",
}

export enum Category {
    ActionAdventure = "Action & adventure",
    CardBoard = "Card & board",
    Classics = "Classics",
    FamilyKids = "Family & kids",
    Fighting = "Fighting",
    MultiPlayerOnlineBattleArena = "Multi-Player Online Battle Arena",
    Other = "Other",
    Platformer = "Platformer",
    PuzzleTrivia = "Puzzle & trivia",
    RacingFlying = "Racing & flying",
    RolePlaying = "Role playing",
    Shooter = "Shooter",
    Simulation = "Simulation",
    Sports = "Sports",
    Strategy = "Strategy",
    Word = "Word",
}

export interface Image {
    uri:    string;
    height: number;
    width:  number;
}

export enum ProductKind {
    Game = "GAME",
}

export enum XCloudProgram {
    Byog = "BYOG",
    Gpultimate = "GPULTIMATE",
}
