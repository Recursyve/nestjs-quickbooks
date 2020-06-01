import { QuickBooksQueryModel } from "../../common/models";
import { QuickBookItemTypes } from "./items.model";

export interface QuickBooksItemsQueryModel extends QuickBooksQueryModel {
    Name: string;
    Type: QuickBookItemTypes;
    Sku: string;
    Active: boolean;
    FullyQualifiedName: string;
}
