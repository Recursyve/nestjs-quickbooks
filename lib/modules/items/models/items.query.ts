import { QuickbooksModel } from "../../common/models/quickbooks.model";
import { QuickBookItemTypes } from "./items.model";

export interface ItemsQuery extends QuickbooksModel {
    Name: string;
    Type: QuickBookItemTypes;
    Sku: string;
    Active: boolean;
    FullyQualifiedName: string;
}
