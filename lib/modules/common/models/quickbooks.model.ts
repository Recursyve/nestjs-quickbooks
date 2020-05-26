export interface QuickbooksMetadata {
    CreateTime: string;
    LastUpdatedTime: string;
}

export interface QuickbooksModel {
    Id: string;
    SyncToken: string;
    MetaData: QuickbooksMetadata;
}
