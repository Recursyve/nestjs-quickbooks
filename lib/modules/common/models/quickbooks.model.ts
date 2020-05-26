export interface QuickBooksMetadata {
    CreateTime: string;
    LastUpdatedTime: string;
}

export interface QuickBooksModel {
    Id: string;
    SyncToken: string;
    MetaData: QuickBooksMetadata;
}

export interface QuickBooksQueryModel {
    Id: string;
    MetaData: QuickBooksMetadata;
}
