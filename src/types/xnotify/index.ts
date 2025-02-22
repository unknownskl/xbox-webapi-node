export interface StatusResponse {
    Status:       StatusResponseStatus;
    CoreServices: CoreService[];
    Titles:       CoreService[];
}

export interface CoreService {
    Id:        number;
    Name:      string;
    Status:    Status;
    Scenarios: Scenario[];
}

export interface Scenario {
    Id:          number;
    Status:      Status;
    Name:        string;
    Devices:     Status[];
    Incidents:   any[];
    Description: string;
}

export interface Status {
    Id:   number;
    Name: State;
}

export enum State {
    AndroidDevices = "Android devices",
    AppleDevices = "Apple devices",
    BackwardCompatibility = "Backward compatibility",
    CloudGaming = "Cloud gaming",
    None = "None",
    SmartTV = "Smart TV",
    WebServices = "Web services",
    Xbox360 = "Xbox 360",
    XboxOnWindows = "Xbox on Windows",
    XboxOne = "Xbox One",
    XboxOneS = "Xbox One S",
    XboxOneX = "Xbox One X",
    XboxSeriesS = "Xbox Series S",
    XboxSeriesX = "Xbox Series X",
}

export interface StatusResponseStatus {
    Overall:           Overall;
    SelectedScenarios: Overall;
}

export interface Overall {
    State:       State;
    Id:          number;
    LastUpdated: Date;
}
