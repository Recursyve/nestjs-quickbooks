import { QuickBookItemTypes } from "../models/items.model";
import { RefDto } from "../../common/dto/ref.dto";

export interface InventoryItem {
    Type: QuickBookItemTypes.Inventory;
    IncomeAccountRef: RefDto;
    AssetAccountRef: RefDto;
    InvStartDate: string;
    ExpenseAccountRef: RefDto;
    QtyOnHand: number;
}

export interface NonInventoryItem {
    Type: QuickBookItemTypes.NonInventory;
    ExpenseAccountRef: RefDto;
}

export interface ServiceItem {
    Type: QuickBookItemTypes.Service;
    IncomeAccountRef: RefDto;
    ExpenseAccountRef: RefDto;
}

export interface ItemsDto {
    Name: string;
    Sku?: string;
    SalesTaxIncluded?: boolean;
    TrackQtyOnHand?: boolean;
    SalesTaxCodeRef?: RefDto;
    ClassRef?: RefDto;
    PurchaseTaxIncluded?: boolean;
    Description?: string;
    AbatementRate?: number;
    ReverseChargeRate?: number;
    SubItem?: boolean;
    Taxable?: boolean;
    UQCDisplayText?: string;
    ReorderPoint?: number;
    PurchaseDesc?: string;
    PrefVendorRef?: RefDto;
    Active?: boolean;
    UQCId?: string;
    PurchaseTaxCodeRef?: RefDto;
    ServiceType?: string;
    PurchaseCost?: number;
    ParentRef?: RefDto;
    UnitPrice?: number;
    TaxClassificationRef?: RefDto;
}

export type CreateItemDto = (
    InventoryItem |
    NonInventoryItem |
    ServiceItem
) & ItemsDto;

export type FullUpdateItemDto = (
    InventoryItem |
    NonInventoryItem |
    ServiceItem
) & ItemsDto;
