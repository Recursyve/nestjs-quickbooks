import { QuickBooksModel } from "../../common/models/quickbooks.model";
import { QuickBooksCustomersAddress } from "../../customers/models/customers.model";
import { QuickBooksRefModel } from "../../common/models/ref.model";

export interface QuickBooksInvoiceCustomField {
    DefinitionId: string;
    StringValue: string;
    Name: string;
    Type: "StringType";
}

export interface QuickBooksInvoiceLinkedTxn {
    TxnId: string;
    TxnType: string;
    TxnLineId: string;
}

export interface QuickBooksInvoiceTxnTaxDetail {
    TxnTaxCodeRef: QuickBooksRefModel;
    TotalTax: number;
    TaxLine: {
        DetailType: string;
        Amount: number;
        TaxLineDetail: {
            TaxRateRef: QuickBooksRefModel;
            NetAmountTaxable: number;
            PercentBased: boolean;
            TaxInclusiveAmount: number;
            OverrideDeltaAmount: number;
            TaxPercent: number;
        };
    }[];
}

export interface QuickBooksInvoiceSalesItemLine {
    Id: string;
    DetailType: "SalesItemLineDetail";
    Amount: number;
    Description: string;
    LineNum: number;
    SalesItemLineDetail: {
        TaxInclusiveAmt: number;
        DiscountAmt: number;
        ItemRef: QuickBooksRefModel;
        ClassRef: QuickBooksRefModel;
        TaxCodeRef: QuickBooksRefModel;
        MarkupInfo: {
            PriceLevelRef: QuickBooksRefModel;
            Percent: number;
            MarkUpIncomeAccountRef: QuickBooksRefModel;
        };
        ItemAccountRef: QuickBooksRefModel;
        ServiceDate: string;
        DiscountRate: number;
        Qty: number;
        UnitPrice: number;
        TaxClassificationRef: QuickBooksRefModel;
    };
}

export interface QuickBooksInvoiceGroupLine {
    Id: string;
    DetailType: "GroupLineDetail";
    Description: string;
    LineNum: number;
    GroupLineDetail: {
        Quantity: number;
        GroupItemRef: QuickBooksRefModel;
        Line: QuickBooksInvoiceSalesItemLine[];
    };
}

export interface QuickBooksInvoiceDescriptionOnlyLine {
    Id: string;
    DetailType: "DescriptionOnly";
    Amount: number;
    Description: string;
    LineNum: number;
    DescriptionLineDetail: {
        TaxCodeRef: QuickBooksRefModel;
        ServiceDate: {
            date: string;
        };
    };
}

export interface QuickBooksInvoiceDiscountLine {
    Id: string;
    DetailType: "DiscountLine";
    Amount: number;
    Description: string;
    LineNum: number;
    DiscountLineDetail: {
        ClassRef: QuickBooksRefModel;
        TaxCodeRef: QuickBooksRefModel;
        DiscountAccountRef: QuickBooksRefModel;
        PercentBased: boolean;
        DiscountPercent: number;
    };
}

export interface QuickBooksInvoiceSubTotalLine {
    Id: string;
    DetailType: "SubTotalLine";
    Amount: number;
    Description: string;
    LineNum: number;
    SubtotalLineDetail: {
        ItemRef: QuickBooksRefModel;
    };
}

export type QuickBooksInvoiceLines =
    QuickBooksInvoiceSalesItemLine |
    QuickBooksInvoiceGroupLine |
    QuickBooksInvoiceDescriptionOnlyLine |
    QuickBooksInvoiceDiscountLine |
    QuickBooksInvoiceSubTotalLine;

export interface QuickBooksInvoices extends QuickBooksModel {
    AllowIPNPayment: boolean;
    AllowOnlinePayment: boolean;
    AllowOnlineCreditCardPayment: boolean;
    AllowOnlineACHPayment: boolean;
    CustomField: QuickBooksInvoiceCustomField[];
    ShipAddr: QuickBooksCustomersAddress;
    DocNumber: string;
    TxnDate: string;
    CurrencyRef: QuickBooksRefModel;
    PrivateNote: string;
    LinkedTxn: QuickBooksInvoiceLinkedTxn[];
    Line: QuickBooksInvoiceLines[];
    TxnTaxDetail: QuickBooksInvoiceTxnTaxDetail;
    CustomerRef: QuickBooksRefModel;
    DueDate: string;
    TotalAmt: number;
    ApplyTaxAfterDiscount: boolean;
    PrintStatus: "NotSet" | "NeedToPrint" | "PrintComplete";
    EmailStatus: "NotSet" | "NeedToSend" | "EmailSent";
    Balance: number;
}
