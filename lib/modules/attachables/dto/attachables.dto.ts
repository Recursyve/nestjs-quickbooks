import { QuickBooksEntityRefDto } from "../../common";
import { QuickbooksAttachableCategoriesEnum } from "../../common/enums/attachable-categories.enum";

export interface QuickBooksAttachableCustomFieldsDto {
    StringValue: string;
    Name?: string;
    Type: "StringType";
}

export interface QuickBooksAttachableRefDto {
    IncludeOnSend?: boolean;
    LineInfo?: string;
    NoRefOnly?: string;
    CustomField?: QuickBooksAttachableCustomFieldsDto[];
    Inactive?: boolean;
    EntityRef?: QuickBooksEntityRefDto;
}

export interface CreateQuickBooksAttachableNoteDto  {
    Note: string;
    AttachableRef?: QuickBooksAttachableRefDto[];
}

export interface FullUpdateQuickBooksAttachableDto  {
    FileName?: string;
    ContentType?: string;
    Note?: string;
    Category?: QuickbooksAttachableCategoriesEnum;
    PlaceName?: string;
    AttachableRef?: QuickBooksAttachableRefDto[];
    Long?: string;
    Tag?: string;
    Lat?: string;
}

export interface UploadQuickBooksAttachableNoteDto  {
    FileName: string;
    File: Buffer;
    ContentType: string;
    Note?: string;
    Category?: QuickbooksAttachableCategoriesEnum;
    PlaceName?: string;
    AttachableRef?: QuickBooksAttachableRefDto[];
    Long?: string;
    Tag?: string;
    Lat?: string;
}
