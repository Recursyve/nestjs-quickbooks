import { QuickBooksQueryModel } from "../../common/models/quickbooks.model";
import { QuickBookItemTypes } from "./items.model";

export interface QuickBooksItemsQuery extends QuickBooksQueryModel {
    Name: string;
    Type: QuickBookItemTypes;
    Sku: string;
    Active: boolean;
    FullyQualifiedName: string;
}
