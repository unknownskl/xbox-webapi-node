export interface ConsoleStatus {
    status:                               Status;
    id:                                   string;
    name:                                 string;
    locale:                               string;
    region:                               string;
    consoleType:                          string;
    powerState:                           string;
    playbackState:                        string;
    loginState:                           null;
    focusAppAumid:                        string;
    isTvConfigured:                       boolean;
    digitalAssistantRemoteControlEnabled: boolean;
    consoleStreamingEnabled:              boolean;
    remoteManagementEnabled:              boolean;
}

export interface Status {
    errorCode:    string;
    errorMessage: null;
}