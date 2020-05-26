import { QuickbooksModel } from "../../common/models/quickbooks.model";
import { RefModel } from "../../common/models/ref.model";

export enum QuickBookItemTypes {
    Inventory = "Inventory",
    Service = "Service",
    NonInventory = "NonInventory"
}

export interface QuickBooksItems extends QuickbooksModel {
    ItemCategoryType: "Product" | "Service";
    Name: string;
    InvStartDate: string;
    Type: QuickBookItemTypes;
    QtyOnHand: number;
    AssetAccountRef: RefModel;
    Sku: string;
    SalesTaxIncluded: boolean;
    TrackQtyOnHand: boolean;
    SalesTaxCodeRef: RefModel;
    ClassRef: RefModel;
    PurchaseTaxIncluded: boolean;
    Description: string;
    AbatementRate: number;
    ReverseChargeRate: number;
    SubItem: boolean;
    Taxable: boolean;
    UQCDisplayText: string;
    ReorderPoint: number;
    PurchaseDesc: string;
    PrefVendorRef: RefModel;
    Active: boolean;
    UQCId: string;
    PurchaseTaxCodeRef: RefModel;
    ServiceType: string;
    PurchaseCost: number;
    ParentRef: RefModel;
    UnitPrice: number;
    FullyQualifiedName: string;
    Level: number;
    IncomeAccountRef: RefModel;
    ExpenseAccountRef: RefModel;
    TaxClassificationRef: RefModel;
}
