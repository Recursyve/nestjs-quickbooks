import { QuickbooksModel } from "../../common/models/quickbooks.model";
import { QuickBooksCustomersAddress } from "../../customers/models/customers.model";

export interface QuickBooksInvoiceCustomField {
    DefinitionId: string;
    StringValue: string;
    Name: string;
    Type: "StringType";
    ShipAddr: QuickBooksCustomersAddress;
}

export interface QuickBooksInvoiceCurrencyRef {
    value: string;
    name: string;
}

export interface QuickBooksInvoiceLinkedTxn {
    TxnId: string;
    TxnType: string;
    TxnLineId: string;
}

export interface QuickBooksInvoiceTxnTaxDetail {
    ReferenceType: string;
    TotalTax: number;
    TaxLine: {
        DetailType: string;
        Amount: number;
        TaxLineDetail: {
            TaxRateRef: {
                value: string;
                name: string;
            };
            NetAmountTaxable: number;
            PercentBased: boolean;
            TaxInclusiveAmount: number;
            OverrideDeltaAmount: number;
            TaxPercent: number;
        };
    }[];
}

export interface QuickBooksInvoiceCustomerRef {
    value: string;
    name: string;
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
        ItemRef: {
            value: string;
            name: string;
        };
        ClassRef: {
            value: string;
            name: string;
        };
        TaxCodeRef: {
            value: string;
            name: string;
        };
        MarkupInfo: {
            PriceLevelRef: {
                value: string;
                name: string;
            };
            Percent: number;
            MarkUpIncomeAccountRef: {
                value: string;
                name: string;
            };
            ItemAccountRef: {
                value: string;
                name: string;
            };
            ServiceDate: string;
            DiscountRate: number;
            Qty: number;
            UnitPrice: number;
            TaxClassificationRef: {
                value: string;
                name: string;
            };
        };
    };
}

export interface QuickBooksInvoiceGroupLine {
    Id: string;
    DetailType: "GroupLineDetail";
    Description: string;
    LineNum: number;
    GroupLineDetail: {
        Quantity: number;
        GroupItemRef: {
            value: string;
            name: string;
        };
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
        TaxCodeRef: {
            value: string;
            name: string;
        };
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
        ClassRef: {
            value: string;
            name: string;
        };
        TaxCodeRef: {
            value: string;
            name: string;
        };
        DiscountAccountRef: {
            value: string;
            name: string;
        };
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
        ItemRef: {
            value: string;
            name: string;
        };
    };
}

export type QuickBooksInvoiceLines =
    QuickBooksInvoiceSalesItemLine |
    QuickBooksInvoiceGroupLine |
    QuickBooksInvoiceDescriptionOnlyLine |
    QuickBooksInvoiceDiscountLine |
    QuickBooksInvoiceSubTotalLine;

export interface QuickBooksInvoicesModel extends QuickbooksModel {
    AllowIPNPayment: boolean;
    AllowOnlinePayment: boolean;
    AllowOnlineCreditCardPayment: boolean;
    AllowOnlineACHPayment: boolean;
    CustomField: QuickBooksInvoiceCustomField[];
    DocNumber: string;
    TxnDate: string;
    CurrencyRef: QuickBooksInvoiceCurrencyRef;
    PrivateNote: string;
    LinkedTxn: QuickBooksInvoiceLinkedTxn[];
    Line: QuickBooksInvoiceLines[],
    TxnTaxDetail: QuickBooksInvoiceTxnTaxDetail;
    CustomerRef: QuickBooksInvoiceCustomerRef;
    DueDate: string;
    TotalAmt: number;
    ApplyTaxAfterDiscount: boolean;
    PrintStatus: "NotSet" | "NeedToPrint" | "PrintComplete";
    EmailStatus: "NotSet" | "NeedToSend" | "EmailSent";
    Balance: number;
}
