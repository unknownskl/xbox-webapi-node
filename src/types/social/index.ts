export interface SummaryResponse {
    targetFollowingCount:                  number;
    targetFollowerCount:                   number;
    isCallerFollowingTarget:               boolean;
    isTargetFollowingCaller:               boolean;
    hasCallerMarkedTargetAsFavorite:       boolean;
    hasCallerMarkedTargetAsIdentityShared: boolean;
    hasCallerMarkedTargetAsKnown:          boolean;
    legacyFriendStatus:                    string;
    availablePeopleSlots:                  number;
    isFriend:                              boolean;
    availableFollowingSlots:               number;
}
