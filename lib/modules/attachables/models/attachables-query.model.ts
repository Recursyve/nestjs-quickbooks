import { QuickBooksQueryModel } from "../../common";
import { QuickbooksAttachableCategoriesEnum } from "../../common/enums/attachable-categories.enum";
import { QuickBooksAttachableRef } from "./attachables.model";

export interface QuickBooksAttachablesQueryModel extends QuickBooksQueryModel {
    FileName: string;
    Note: string;
    Category: QuickbooksAttachableCategoriesEnum;
    AttachableRef: Omit<QuickBooksAttachableRef, "CustomField">;
    ContentType: string;
    PlaceName: string;
    Long: string;
    Tag: string;
    Lat: string;
    Size: number;
}
