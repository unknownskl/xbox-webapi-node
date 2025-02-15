export interface ProfileResponse {
    profileUsers: ProfileUser[];
}

export interface ProfileUser {
    id:              string;
    hostId:          string;
    settings:        Setting[];
    isSponsoredUser: boolean;
}

export interface Setting {
    id:    string;
    value: string;
}
