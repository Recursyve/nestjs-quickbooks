import { QuickBooksRefDto } from "../../common/dto/ref.dto";
import { QuickBooksRefModel } from "../../common/models/ref.model";
import { QuickBooksCustomersAddressDto } from "../../customers/dto/customers.dto";

export interface QuickBooksInvoiceCustomFieldDto {
    DefinitionId: string;
    StringValue?: string;
    Name?: string;
}

export interface QuickBooksInvoiceLinkedTxnDto {
    TxnId?: string;
    TxnType?: string;
    TxnLineId: string;
}

export interface QuickBooksInvoiceTxnTaxDetailDto {
    TxnTaxCodeRef?: QuickBooksRefDto;
    TotalTax?: number;
    TaxLine?: {
        DetailType: "TxnTaxCodeRef";
        TaxLineDetail: {
            TaxRateRef?: QuickBooksRefDto;
            NetAmountTaxable?: number;
            PercentBased?: boolean;
            TaxInclusiveAmount?: number;
            OverrideDeltaAmount?: number;
            TaxPercent?: number;
        };
        Amount?: number;
    }[];
}

export interface QuickBooksInvoicesDto {
    AllowOnlineCreditCardPayment?: boolean;
    AllowOnlineACHPayment?: boolean;
    CustomField?: QuickBooksInvoiceCustomFieldDto[];
    ShipAddr?: QuickBooksCustomersAddressDto;
    DocNumber?: string;
    TxnDate?: string;
    PrivateNote?: string;
    LinkedTxn?: QuickBooksInvoiceLinkedTxnDto[];
    TxnTaxDetail?: QuickBooksInvoiceTxnTaxDetailDto;
    DueDate?: string;
    ApplyTaxAfterDiscount?: boolean;
    PrintStatus?: "NotSet" | "NeedToPrint" | "PrintComplete";
    EmailStatus?: "NotSet" | "NeedToSend" | "EmailSent";
}

export interface CreateQuickBooksSalesItemLineDto {
    DetailType: "SalesItemLineDetail";
    SalesItemLineDetail: {
        TaxInclusiveAmt?: number;
        DiscountAmt?: number;
        ItemRef?: QuickBooksRefDto;
        ClassRef?: QuickBooksRefDto;
        TaxCodeRef?: QuickBooksRefDto;
        MarkupInfo?: {
            PriceLevelRef?: QuickBooksRefDto;
            Percent?: number;
            MarkUpIncomeAccountRef?: QuickBooksRefDto;
        };
        ItemAccountRef?: QuickBooksRefDto;
        ServiceDate?: string;
        DiscountRate?: number;
        Qty?: number;
        UnitPrice?: number;
        TaxClassificationRef?: QuickBooksRefDto;
    };
    Amount: number;
    Description?: string;
    LineNum?: number;
}

export interface CreateQuickBooksInvoiceGroupLineDto {
    DetailType: "GroupLineDetail";
    GroupLineDetail: {
        Quantity?: number;
        GroupItemRef?: QuickBooksRefDto;
        Line?: CreateQuickBooksSalesItemLineDto[];
    };
    Description?: string;
    LineNum?: number;
}

export interface CreateQuickBooksInvoiceDescriptionOnlyLineDto {
    DetailType: "DescriptionOnly";
    DescriptionLineDetail: {
        TaxCodeRef?: QuickBooksRefModel;
        ServiceDate?: {
            date: string;
        };
    };
    Amount?: number;
    Description?: string;
    LineNum?: number;
}

export type CreateQuickBooksInvoiceLines =
    CreateQuickBooksSalesItemLineDto |
    CreateQuickBooksInvoiceGroupLineDto |
    CreateQuickBooksInvoiceDescriptionOnlyLineDto;

export interface CreateQuickBooksInvoicesDto extends QuickBooksInvoicesDto {
    CustomerRef: QuickBooksRefDto;
    Line: CreateQuickBooksInvoiceLines[];
    CurrencyRef?: QuickBooksRefDto;
}

export interface UpdateQuickBooksSalesItemLineDto extends CreateQuickBooksSalesItemLineDto {
    Id: string;
}

export interface UpdateQuickBooksInvoiceGroupLineDto extends CreateQuickBooksInvoiceGroupLineDto {
    Id: string;
}

export interface UpdateQuickBooksInvoiceDescriptionOnlyLineDto extends CreateQuickBooksInvoiceDescriptionOnlyLineDto {
    Id: string;
}

export type UpdateQuickBooksInvoiceLines =
    UpdateQuickBooksSalesItemLineDto |
    UpdateQuickBooksInvoiceGroupLineDto |
    UpdateQuickBooksInvoiceDescriptionOnlyLineDto;

export interface FullQuickBooksUpdateInvoicesDto extends QuickBooksInvoicesDto {
    CustomerRef: QuickBooksRefDto;
    Line: UpdateQuickBooksInvoiceLines[];
    CurrencyRef?: QuickBooksRefDto;
}

export interface SparseQuickBooksUpdateInvoicesDto extends QuickBooksInvoicesDto {
    CustomerRef?: QuickBooksRefDto;
    Line?: UpdateQuickBooksInvoiceLines[];
    CurrencyRef?: QuickBooksRefDto;
}
