export interface UserstatResponse {
    groups:              Group[];
    statlistscollection: Userstat[];
}

export interface Group {
    name:                string;
    titleid:             string;
    statlistscollection: GroupStatlistscollection[];
}

export interface GroupStatlistscollection {
    arrangebyfield:   string;
    arrangebyfieldid: string;
    stats:            Userstat[];
}



export interface Userstat {
    groupproperties: Groupproperties;
    xuid:            string;
    scid:            string;
    titleid?:        string;
    name:            string;
    type:            string;
    value:           string;
    properties:      Properties;
}

export interface Groupproperties {
    Ordinal?:         string;
    SortOrder?:       string;
    DisplayName?:     string;
    DisplayFormat?:   string;
    DisplaySemantic?: string;
}

export interface Properties {
    DisplayName?: string;
}