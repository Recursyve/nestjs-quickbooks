import { QuickBookItemTypes } from "../models/items.model";
import { QuickBooksRefDto } from "../../common/dto/ref.dto";

export interface QuickBooksInventoryItem {
    Type: QuickBookItemTypes.Inventory;
    IncomeAccountRef: QuickBooksRefDto;
    AssetAccountRef: QuickBooksRefDto;
    InvStartDate: string;
    ExpenseAccountRef: QuickBooksRefDto;
    QtyOnHand: number;
}

export interface QuickBooksNonInventoryItem {
    Type: QuickBookItemTypes.NonInventory;
    ExpenseAccountRef: QuickBooksRefDto;
}

export interface QuickBooksServiceItem {
    Type: QuickBookItemTypes.Service;
    IncomeAccountRef: QuickBooksRefDto;
    ExpenseAccountRef: QuickBooksRefDto;
}

export interface QuickBooksItemsDto {
    Name: string;
    Sku?: string;
    SalesTaxIncluded?: boolean;
    TrackQtyOnHand?: boolean;
    SalesTaxCodeRef?: QuickBooksRefDto;
    ClassRef?: QuickBooksRefDto;
    PurchaseTaxIncluded?: boolean;
    Description?: string;
    AbatementRate?: number;
    ReverseChargeRate?: number;
    SubItem?: boolean;
    Taxable?: boolean;
    UQCDisplayText?: string;
    ReorderPoint?: number;
    PurchaseDesc?: string;
    PrefVendorRef?: QuickBooksRefDto;
    Active?: boolean;
    UQCId?: string;
    PurchaseTaxCodeRef?: QuickBooksRefDto;
    ServiceType?: string;
    PurchaseCost?: number;
    ParentRef?: QuickBooksRefDto;
    UnitPrice?: number;
    TaxClassificationRef?: QuickBooksRefDto;
}

export type CreateQuickBooksItemsDto = (
    QuickBooksInventoryItem |
    QuickBooksNonInventoryItem |
    QuickBooksServiceItem
) & QuickBooksItemsDto;

export type FullUpdateQuickBooksItemsDto = (
    QuickBooksInventoryItem |
    QuickBooksNonInventoryItem |
    QuickBooksServiceItem
) & QuickBooksItemsDto;
