export interface PeopleResponse {
    people:                Person[];
    recommendationSummary: null;
    friendFinderState:     null;
}

export interface Person {
    xuid:                   string;
    isFavorite:             boolean;
    isFollowingCaller:      boolean;
    isFollowedByCaller:     boolean;
    isIdentityShared:       boolean;
    addedDateTimeUtc:       Date;
    displayName:            string;
    realName:               string;
    displayPicRaw:          string;
    showUserAsAvatar:       string;
    gamertag:               string;
    gamerScore:             string;
    xboxOneRep:             XboxOneRep;
    presenceState:          PresenceState;
    presenceText:           string;
    presenceDevices:        null;
    isBroadcasting:         boolean;
    isCloaked:              null;
    isQuarantined:          boolean;
    suggestion:             null;
    recommendation:         null;
    titleHistory:           null;
    multiplayerSummary:     MultiplayerSummary;
    recentPlayer:           null;
    follower:               null;
    preferredColor:         PreferredColor;
    presenceDetails:        PresenceDetail[];
    titlePresence:          null;
    titleSummaries:         null;
    presenceTitleIds:       null;
    detail:                 Detail;
    communityManagerTitles: null;
    socialManager:          null;
    broadcast:              null;
    tournamentSummary:      null;
    avatar:                 null;
}

export interface Detail {
    accountTier:    AccountTier;
    bio:            string;
    isVerified:     boolean;
    location:       string;
    tenure:         string;
    watermarks:     string[];
    blocked:        boolean;
    mute:           boolean;
    followerCount:  number;
    followingCount: number;
}

export enum AccountTier {
    Gold = "Gold",
    Silver = "Silver",
}

export interface MultiplayerSummary {
    InMultiplayerSession: number;
    InParty:              number;
}

export interface PreferredColor {
    primaryColor:   string;
    secondaryColor: string;
    tertiaryColor:  string;
}

export interface PresenceDetail {
    IsBroadcasting:   boolean;
    Device:           string;
    PresenceText:     string;
    State:            State;
    TitleId:          string;
    TitleType:        null;
    IsPrimary:        boolean;
    IsGame:           boolean;
    RichPresenceText: null | string;
}

export enum State {
    Active = "Active",
    LastSeen = "LastSeen",
}

export enum PresenceState {
    Offline = "Offline",
    Online = "Online",
}

export enum XboxOneRep {
    GoodPlayer = "GoodPlayer",
}
