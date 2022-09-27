import { QuickBooksEntityRefModel, QuickBooksModel } from "../../common";
import { QuickbooksAttachableCategoriesEnum } from "../../common/enums/attachable-categories.enum";

export interface QuickBooksAttachableCustomFields {
    DefinitionId: string;
    StringValue: string;
    Name?: string;
    Type: "StringType";
}

export interface QuickBooksAttachableRef {
    IncludeOnSend?: boolean;
    LineInfo?: string;
    NoRefOnly?: boolean;
    CustomField?: QuickBooksAttachableCustomFields[];
    Inactive?: boolean;
    EntityRef?: QuickBooksEntityRefModel;
}

export interface QuickBooksAttachables extends QuickBooksModel {
    FileName?: string;
    Note?: string;
    Category?: QuickbooksAttachableCategoriesEnum;
    ContentType?: string;
    PlaceName?: string;
    AttachableRef?: QuickBooksAttachableRef[];
    Long?: string;
    Tag?: string;
    Lat?: string;
    FileAccessUri?: string;
    Size?: number;
    ThumbnailFileAccessUri?: string;
    TempDownloadUri?: string;
    ThumbnailTempDownloadUri?: string;
}
