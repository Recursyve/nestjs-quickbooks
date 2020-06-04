import {
    QuickBooksCustomFieldModel,
    QuickBooksDateModel,
    QuickBooksEmailModel,
    QuickBooksLinkedTxnModel,
    QuickBooksMarkupInfoModel,
    QuickBooksMemoRefModel,
    QuickBooksModel,
    QuickBooksPhysicalAddressModel,
    QuickBooksRefModel,
    QuickBooksTxnTaxDetailModel
} from "../../common/models";
import { QuickBooksEmailStatusesEnum, QuickBooksGlobalTaxCalculationsEnum } from "../../common/enums";

export interface QuickBooksBaseInvoiceLinesModel {
    Id: string;
    DetailType: string;
    Description?: string;
    LineNum?: number;
}

export interface QuickBooksInvoiceSalesItemLineModel extends QuickBooksBaseInvoiceLinesModel {
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

export interface QuickBooksInvoiceGroupLineModel extends QuickBooksBaseInvoiceLinesModel {
    DetailType: "GroupLineDetail";
    GroupLineDetail: {
        Quantity?: number;
        GroupItemRef?: QuickBooksRefModel;
        Line?: QuickBooksInvoiceSalesItemLineModel[];
    };
}

export interface QuickBooksInvoiceDescriptionOnlyLineModel extends QuickBooksBaseInvoiceLinesModel {
    DetailType: "DescriptionOnly";
    Amount: number;
    DescriptionLineDetail: {
        TaxCodeRef?: QuickBooksRefModel;
        ServiceDate?: QuickBooksDateModel;
    };
}

export interface QuickBooksInvoiceDiscountLineModel extends QuickBooksBaseInvoiceLinesModel {
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

export interface QuickBooksInvoiceSubTotalLineModel extends QuickBooksBaseInvoiceLinesModel {
    DetailType: "SubTotalLine";
    Amount: number;
    SubtotalLineDetail: {
        ItemRef: QuickBooksRefModel;
    };
}

export type QuickBooksInvoiceLinesModel =
    QuickBooksInvoiceSalesItemLineModel |
    QuickBooksInvoiceGroupLineModel |
    QuickBooksInvoiceDescriptionOnlyLineModel |
    QuickBooksInvoiceDiscountLineModel |
    QuickBooksInvoiceSubTotalLineModel;

export interface QuickBooksInvoices extends QuickBooksModel {
    Line: QuickBooksInvoiceLinesModel[];
    CustomerRef: QuickBooksRefModel;
    CurrencyRef?: QuickBooksRefModel;
    DocNumber?: string;
    BillEmail?: QuickBooksEmailModel;
    TxnDate?: string;
    ShipFromAddr?: QuickBooksPhysicalAddressModel;
    ShipDate?: QuickBooksDateModel;
    TrackingNum?: string;
    ClassRef?: QuickBooksRefModel;
    PrintStatus?: "NotSet" | "NeedToPrint" | "PrintComplete";
    SalesTermRef?: QuickBooksRefModel;
    TxnSource?: string;
    LinkedTxn?: QuickBooksLinkedTxnModel[];
    GlobalTaxCalculation?: QuickBooksGlobalTaxCalculationsEnum;
    AllowOnlineACHPayment?: boolean;
    TransactionLocationType?: string;
    DueDate?: string;
    PrivateNote?: string;
    DepositToAccountRef?: QuickBooksRefModel;
    BillEmailCc?: QuickBooksEmailModel;
    CustomerMemo?: QuickBooksMemoRefModel;
    EmailStatus?: QuickBooksEmailStatusesEnum;
    ExchangeRate?: number;
    Deposit?: number;
    TxnTaxDetail?: QuickBooksTxnTaxDetailModel;
    AllowOnlineCreditCardPayment?: boolean;
    CustomField?: QuickBooksCustomFieldModel[];
    ShipAddr?: QuickBooksPhysicalAddressModel;
    DepartmentRef?: QuickBooksRefModel;
    BillEmailBcc?: QuickBooksEmailModel;
    ShipMethodRef?: QuickBooksRefModel;
    BillAddr?: QuickBooksPhysicalAddressModel;
    ApplyTaxAfterDiscount?: boolean;
    HomeBalance: number;
    TotalAmt: number;
    InvoiceLink: string;
    TaxExemptionRef: QuickBooksRefModel;
    Balance: number;
    HomeTotalAmt: number;
    FreeFormAddress: boolean;
}
