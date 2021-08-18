import { QuickBooksModel } from "../../common";
import { QuickBooksPurchaseTaxRateListModel } from "../../common/models/purchase-tax-rate-list.model";
import { QuickBooksSalesTaxRateListModel } from "../../common/models/sales-tax-rate-list.model";

export interface QuickBooksTaxCodes extends QuickBooksModel {
    domain: string;
    TaxGroup: boolean;
    Name: string;
    Taxable: boolean;
    PurchaseTaxRateList: QuickBooksPurchaseTaxRateListModel;
    sparse: boolean;
    Active: boolean;
    Description: string;
    SalesTaxRateList: QuickBooksSalesTaxRateListModel;
}
