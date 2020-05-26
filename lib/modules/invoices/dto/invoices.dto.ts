import { RefDto } from "../../common/dto/ref.dto";
import { RefModel } from "../../common/models/ref.model";
import { CustomersAddressDto } from "../../customers/dto/customers.dto";

export interface InvoiceCustomFieldDto {
    DefinitionId: string;
    StringValue?: string;
    Name?: string;
}

export interface InvoiceLinkedTxnDto {
    TxnId?: string;
    TxnType?: string;
    TxnLineId: string;
}

export interface InvoiceTxnTaxDetailDto {
    TxnTaxCodeRef?: RefDto;
    TotalTax?: number;
    TaxLine?: {
        DetailType: "TxnTaxCodeRef";
        TaxLineDetail: {
            TaxRateRef?: RefDto;
            NetAmountTaxable?: number;
            PercentBased?: boolean;
            TaxInclusiveAmount?: number;
            OverrideDeltaAmount?: number;
            TaxPercent?: number;
        };
        Amount?: number;
    }[];
}

export interface InvoicesDto {
    AllowOnlineCreditCardPayment?: boolean;
    AllowOnlineACHPayment?: boolean;
    CustomField?: InvoiceCustomFieldDto[];
    ShipAddr?: CustomersAddressDto;
    DocNumber?: string;
    TxnDate?: string;
    PrivateNote?: string;
    LinkedTxn?: InvoiceLinkedTxnDto[];
    TxnTaxDetail?: InvoiceTxnTaxDetailDto;
    DueDate?: string;
    ApplyTaxAfterDiscount?: boolean;
    PrintStatus?: "NotSet" | "NeedToPrint" | "PrintComplete";
    EmailStatus?: "NotSet" | "NeedToSend" | "EmailSent";
}

export interface CreateSalesItemLineDto {
    DetailType: "SalesItemLineDetail";
    SalesItemLineDetail: {
        TaxInclusiveAmt?: number;
        DiscountAmt?: number;
        ItemRef?: RefDto;
        ClassRef?: RefDto;
        TaxCodeRef?: RefDto;
        MarkupInfo?: {
            PriceLevelRef?: RefDto;
            Percent?: number;
            MarkUpIncomeAccountRef?: RefDto;
        };
        ItemAccountRef?: RefDto;
        ServiceDate?: string;
        DiscountRate?: number;
        Qty?: number;
        UnitPrice?: number;
        TaxClassificationRef?: RefDto;
    };
    Amount: number;
    Description?: string;
    LineNum?: number;
}

export interface CreateInvoiceGroupLineDto {
    DetailType: "GroupLineDetail";
    GroupLineDetail: {
        Quantity?: number;
        GroupItemRef?: RefDto;
        Line?: CreateSalesItemLineDto[];
    };
    Description?: string;
    LineNum?: number;
}

export interface CreateInvoiceDescriptionOnlyLineDto {
    DetailType: "DescriptionOnly";
    DescriptionLineDetail: {
        TaxCodeRef?: RefModel;
        ServiceDate?: {
            date: string;
        };
    };
    Amount?: number;
    Description?: string;
    LineNum?: number;
}

export type CreateInvoiceLines =
    CreateSalesItemLineDto |
    CreateInvoiceGroupLineDto |
    CreateInvoiceDescriptionOnlyLineDto;

export interface CreateInvoicesDto extends InvoicesDto {
    CustomerRef: RefDto;
    Line: CreateInvoiceLines[];
    CurrencyRef?: RefDto;
}

export interface UpdateSalesItemLineDto extends CreateSalesItemLineDto {
    Id: string;
}

export interface UpdateInvoiceGroupLineDto extends CreateInvoiceGroupLineDto {
    Id: string;
}

export interface UpdateInvoiceDescriptionOnlyLineDto extends CreateInvoiceDescriptionOnlyLineDto {
    Id: string;
}

export type UpdateInvoiceLines =
    UpdateSalesItemLineDto |
    UpdateInvoiceGroupLineDto |
    UpdateInvoiceDescriptionOnlyLineDto;

export interface FullUpdateInvoicesDto extends InvoicesDto {
    CustomerRef: RefDto;
    Line: UpdateInvoiceLines[];
    CurrencyRef?: RefDto;
}

export interface SparseUpdateInvoicesDto extends InvoicesDto {
    CustomerRef?: RefDto;
    Line?: UpdateInvoiceLines[];
    CurrencyRef?: RefDto;
}
