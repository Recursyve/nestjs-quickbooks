import {
    QuickBooksCustomFieldModel,
    QuickBooksDateModel,
    QuickBooksEmailModel,
    QuickBooksEmailStatusesEnum,
    QuickBooksGlobalTaxCalculationsEnum,
    QuickBooksLinkedTxnModel,
    QuickBooksMarkupInfoModel,
    QuickBooksMemoRefModel,
    QuickBooksModel,
    QuickBooksPhysicalAddressModel,
    QuickBooksRefModel,
    QuickBooksTxnTaxDetailModel
} from "../../common";
import { QuickBooksCurrencyRefModel } from "../../common/models/currency-ref.model";

export interface QuickBooksBaseEstimateLinesModel {
    Id: string;
    DetailType: "SalesItemLineDetail" | "GroupLineDetail" | "DescriptionOnly" | "DiscountLineDetail" | "SubTotalLineDetail";
    Description?: string;
    LineNum?: number;
}

export interface QuickBooksEstimateSalesItemLineModel extends QuickBooksBaseEstimateLinesModel {
    DetailType: "SalesItemLineDetail";
    SalesItemLineDetail: {
        TaxInclusiveAmt?: number;
        DiscountAmt?: number;
        ItemRef?: QuickBooksRefModel;
        ClassRef?: QuickBooksRefModel;
        TaxCodeRef?: QuickBooksRefModel;
        MarkupInfo?: QuickBooksMarkupInfoModel;
        ItemAccountRef?: QuickBooksRefModel;
        ServiceDate?: string;
        DiscountRate?: number;
        Qty?: number;
        UnitPrice?: number;
        TaxClassificationRef?: QuickBooksRefModel;
    };
    Amount: number;
}

export interface QuickBooksEstimateGroupLineModel extends QuickBooksBaseEstimateLinesModel {
    DetailType: "GroupLineDetail";
    GroupLineDetail: {
        Quantity?: number;
        GroupItemRef?: QuickBooksRefModel;
        Line?: QuickBooksEstimateSalesItemLineModel[];
    };
}

export interface QuickBooksEstimateDescriptionOnlyLineModel extends QuickBooksBaseEstimateLinesModel {
    DetailType: "DescriptionOnly";
    Amount: number;
    DescriptionLineDetail: {
        TaxCodeRef?: QuickBooksRefModel;
        ServiceDate?: QuickBooksDateModel;
    };
}

export interface QuickBooksEstimateDiscountLineModel extends QuickBooksBaseEstimateLinesModel {
    DetailType: "DiscountLineDetail";
    Amount: number;
    DiscountLineDetail: {
        ClassRef?: QuickBooksRefModel;
        TaxCodeRef?: QuickBooksRefModel;
        DiscountAccountRef?: QuickBooksRefModel;
        PercentBased?: boolean;
        DiscountPercent?: number;
    };
}

export interface QuickBooksEstimateSubTotalLineModel extends QuickBooksBaseEstimateLinesModel {
    DetailType: "SubTotalLineDetail";
    Amount: number;
    SubtotalLineDetail: {
        ItemRef: QuickBooksRefModel;
    };
}

export type QuickBooksEstimateLinesModel =
    QuickBooksEstimateSalesItemLineModel |
    QuickBooksEstimateGroupLineModel |
    QuickBooksEstimateDescriptionOnlyLineModel |
    QuickBooksEstimateDiscountLineModel |
    QuickBooksEstimateSubTotalLineModel;

export interface QuickBooksEstimates extends QuickBooksModel {
    CustomerRef: QuickBooksRefModel;
    CurrencyRef: QuickBooksCurrencyRefModel;
    BillEmail: QuickBooksEmailModel;
    TxnDate: QuickBooksDateModel;
    ShipFromAddr: QuickBooksPhysicalAddressModel;
    ShipDate: QuickBooksDateModel;
    ClassRef: QuickBooksRefModel;
    PrintStatus?: "NotSet" | "NeedToPrint" | "PrintComplete";
    CustomField: QuickBooksCustomFieldModel;
    SalesTermRef: QuickBooksRefModel;
    TxnStatus: "Accepted" | "Closed" | "Pending" | "Rejected";
    LinkedTxn: QuickBooksLinkedTxnModel[];
    GlobalTaxCalculation: QuickBooksGlobalTaxCalculationsEnum;
    AcceptedDate: string;
    ExpirationDate: QuickBooksDateModel;
    DueDate: QuickBooksDateModel;
    DocNumber: string;
    PrivateNote: string;
    Line: QuickBooksEstimateLinesModel[];
    CustomerMemo: QuickBooksMemoRefModel;
    EmailStatus: QuickBooksEmailStatusesEnum;
    TxnTaxDetail: QuickBooksTxnTaxDetailModel;
    AcceptedBy: string;
    ExchangeRate: number;
    ShipAddr: QuickBooksPhysicalAddressModel;
    DepartmentRef: QuickBooksRefModel;
    BillAddr: QuickBooksPhysicalAddressModel;
    ApplyTaxAfterDiscount: boolean;
    TotalAmt: number;
    RecurDataRef: QuickBooksRefModel;
    TaxExemptionRef: QuickBooksRefModel;
    HomeTotalAmt: number;
    FreeFormAddress: boolean;
}
