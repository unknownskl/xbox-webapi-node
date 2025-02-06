// Inbox
export interface InboxResponse {
    primary:        Primary;
    folders:        Primary[];
    safetySettings: SafetySettings;
}

export interface Primary {
    folder:         string;
    totalCount:     number;
    unreadCount:    number;
    conversations?: Conversation[];
}

export interface Conversation {
    timestamp:            Date;
    networkId:            NetworkID;
    type:                 ConversationTypeEnum;
    conversationId:       string;
    participants:         string[];
    folder:               Folder;
    readHorizon:          string;
    deleteHorizon:        string;
    lastMessage:          LastMessage;
    notificationOptions:  NotificationOptions;
    isRead:               boolean;
    directMentionHorizon: string;
}

export enum Folder {
    Primary = "Primary",
}

export interface LastMessage {
    contentPayload:      ContentPayload;
    timestamp:           Date;
    lastUpdateTimestamp: Date;
    type:                PurpleType;
    networkId:           NetworkID;
    conversationType:    ConversationTypeEnum;
    conversationId:      string;
    owner?:              number;
    sender:              string;
    messageId:           string;
    clock:               string;
    isDeleted:           boolean;
    isServerUpdated:     boolean;
}

export interface ContentPayload {
    content: Content;
}

export interface Content {
    parts: Part[];
}

export interface Part {
    contentType:        ContentType;
    version:            number;
    text?:               string;
    voiceAttachmentId?: string;
    duration?:          number;
}

export enum NotificationOptions {
    Smart = "Smart",
}

export interface SafetySettings {
    version:             number;
    primaryInboxMedia:   string;
    primaryInboxText:    string;
    primaryInboxUrl:     string;
    secondaryInboxMedia: string;
    secondaryInboxText:  string;
    secondaryInboxUrl:   string;
    canUnobscure:        boolean;
}



// Conversations
export interface ConversationResponse {
    timestamp:            Date;
    networkId:            NetworkID;
    type:                 ConversationTypeEnum;
    conversationId:       string;
    participants:         string[];
    readHorizon:          string;
    deleteHorizon:        string;
    isRead:               boolean;
    folder:               string;
    notificationOptions:  string;
    messages:             Message[];
    continuationToken:    null;
    directMentionHorizon: string;
    muted:                boolean;
    voiceId:              string;
    voiceRoster:          any[];
}

export interface Message {
    contentPayload:      ContentPayload;
    timestamp:           Date;
    lastUpdateTimestamp: Date;
    type:                PurpleType;
    networkId:           NetworkID;
    conversationType:    ConversationTypeEnum;
    conversationId:      string;
    sender:              string;
    messageId:           string;
    clock:               string;
    isDeleted:           boolean;
    isServerUpdated:     boolean;
}

export interface ContentPayload {
    content: Content;
}

export interface Content {
    parts: Part[];
}

export interface Part {
    contentType: ContentType;
    text?:       string;
    version:     number;
    buttonText?: string;
    appUri?:     null | string;
    code?:       string;
    webUri?:     null | string;
}

export enum ContentType {
    Deeplink = "deeplink",
    Fivebyfive = "fivebyfive",
    Text = "text",
    Voice = "voice",
}

export enum ConversationTypeEnum {
    OneToOne = "OneToOne",
}

export enum NetworkID {
    Xbox = "Xbox",
}

export enum PurpleType {
    ContentMessage = "ContentMessage",
}
