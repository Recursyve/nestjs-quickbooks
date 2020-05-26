import { QuickbooksModel } from "../../common/models/quickbooks.model";
import { QuickBooksCustomersAddress } from "../../customers/models/customers.model";
import { RefModel } from "../../common/models/ref.model";

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
    TxnTaxCodeRef: RefModel;
    TotalTax: number;
    TaxLine: {
        DetailType: string;
        Amount: number;
        TaxLineDetail: {
            TaxRateRef: RefModel;
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
        ItemRef: RefModel;
        ClassRef: RefModel;
        TaxCodeRef: RefModel;
        MarkupInfo: {
            PriceLevelRef: RefModel;
            Percent: number;
            MarkUpIncomeAccountRef: RefModel;
        };
        ItemAccountRef: RefModel;
        ServiceDate: string;
        DiscountRate: number;
        Qty: number;
        UnitPrice: number;
        TaxClassificationRef: RefModel;
    };
}

export interface QuickBooksInvoiceGroupLine {
    Id: string;
    DetailType: "GroupLineDetail";
    Description: string;
    LineNum: number;
    GroupLineDetail: {
        Quantity: number;
        GroupItemRef: RefModel;
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
        TaxCodeRef: RefModel;
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
        ClassRef: RefModel;
        TaxCodeRef: RefModel;
        DiscountAccountRef: RefModel;
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
        ItemRef: RefModel;
    };
}

export type QuickBooksInvoiceLines =
    QuickBooksInvoiceSalesItemLine |
    QuickBooksInvoiceGroupLine |
    QuickBooksInvoiceDescriptionOnlyLine |
    QuickBooksInvoiceDiscountLine |
    QuickBooksInvoiceSubTotalLine;

export interface QuickBooksInvoices extends QuickbooksModel {
    AllowIPNPayment: boolean;
    AllowOnlinePayment: boolean;
    AllowOnlineCreditCardPayment: boolean;
    AllowOnlineACHPayment: boolean;
    CustomField: QuickBooksInvoiceCustomField[];
    ShipAddr: QuickBooksCustomersAddress;
    DocNumber: string;
    TxnDate: string;
    CurrencyRef: RefModel;
    PrivateNote: string;
    LinkedTxn: QuickBooksInvoiceLinkedTxn[];
    Line: QuickBooksInvoiceLines[],
    TxnTaxDetail: QuickBooksInvoiceTxnTaxDetail;
    CustomerRef: RefModel;
    DueDate: string;
    TotalAmt: number;
    ApplyTaxAfterDiscount: boolean;
    PrintStatus: "NotSet" | "NeedToPrint" | "PrintComplete";
    EmailStatus: "NotSet" | "NeedToSend" | "EmailSent";
    Balance: number;
}
