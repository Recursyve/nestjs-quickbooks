import { QuickBooksDateTimeModel } from "./date-time.model";

export interface QuickBooksMetadata {
    CreateTime: QuickBooksDateTimeModel;
    LastUpdatedTime: QuickBooksDateTimeModel;
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
