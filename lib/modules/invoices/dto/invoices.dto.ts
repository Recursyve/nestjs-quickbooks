import {
    QuickBooksCustomFieldDto,
    QuickBooksDateDto,
    QuickBooksEmailDto,
    QuickBooksLinkedTxnDto,
    QuickBooksMarkupInfoDto,
    QuickBooksMemoRefDto,
    QuickBooksPhysicalAddressDto,
    QuickBooksRefDto,
    QuickBooksTxnTaxDetailDto
} from "../../common/dto";
import { QuickBooksEmailStatusesEnum, QuickBooksGlobalTaxCalculationsEnum } from "../../common/enums";
import { QuickBooksRefModel } from "../../common/models";
import { QuickBooksBaseInvoiceLinesModel } from "..";

export interface QuickBooksInvoicesDto {
    CurrencyRef?: QuickBooksRefDto;
    DocNumber?: string;
    BillEmail?: QuickBooksEmailDto;
    TxnDate?: string;
    ShipFromAddr?: QuickBooksPhysicalAddressDto;
    ShipDate?: QuickBooksDateDto;
    TrackingNum?: string;
    ClassRef?: QuickBooksRefDto;
    PrintStatus?: "NotSet" | "NeedToPrint" | "PrintComplete";
    SalesTermRef?: QuickBooksRefDto;
    TxnSource?: string;
    LinkedTxn?: QuickBooksLinkedTxnDto[];
    GlobalTaxCalculation?: QuickBooksGlobalTaxCalculationsEnum;
    AllowOnlineACHPayment?: boolean;
    TransactionLocationType?: string;
    DueDate?: string;
    PrivateNote?: string;
    DepositToAccountRef?: QuickBooksRefDto;
    BillEmailCc?: QuickBooksEmailDto;
    CustomerMemo?: QuickBooksMemoRefDto;
    EmailStatus?: QuickBooksEmailStatusesEnum;
    ExchangeRate?: number;
    Deposit?: number;
    TxnTaxDetail?: QuickBooksTxnTaxDetailDto;
    AllowOnlineCreditCardPayment?: boolean;
    CustomField?: QuickBooksCustomFieldDto[];
    ShipAddr?: QuickBooksPhysicalAddressDto;
    DepartmentRef?: QuickBooksRefDto;
    BillEmailBcc?: QuickBooksEmailDto;
    ShipMethodRef?: QuickBooksRefDto;
    BillAddr?: QuickBooksPhysicalAddressDto;
    ApplyTaxAfterDiscount?: boolean;
}

export interface CreateQuickBooksInvoiceSalesItemLineDto {
    DetailType: "SalesItemLineDetail";
    SalesItemLineDetail: {
        TaxInclusiveAmt?: number;
        DiscountAmt?: number;
        ItemRef?: QuickBooksRefDto;
        ClassRef?: QuickBooksRefDto;
        TaxCodeRef?: QuickBooksRefDto;
        MarkupInfo?: QuickBooksMarkupInfoDto;
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
        Line?: CreateQuickBooksInvoiceSalesItemLineDto[];
    };
    Description?: string;
    LineNum?: number;
}

export interface CreateQuickBooksInvoiceDescriptionOnlyLineDto {
    DetailType: "DescriptionOnly";
    DescriptionLineDetail: {
        TaxCodeRef?: QuickBooksRefDto;
        ServiceDate?: QuickBooksDateDto;
    };
    Description?: string;
    LineNum?: number;
}

export interface CreateQuickBooksInvoiceDiscountLineDto {
    DetailType: "DiscountLine";
    Amount: number;
    DiscountLineDetail: {
        ClassRef?: QuickBooksRefModel;
        TaxCodeRef?: QuickBooksRefModel;
        DiscountAccountRef?: QuickBooksRefModel;
        PercentBased?: boolean;
        DiscountPercent?: number;
    };
    Description?: string;
    LineNum?: number;
}

export interface CreateQuickBooksInvoiceSubTotalLineModel {
    DetailType: "SubTotalLine";
    Amount: number;
    SubtotalLineDetail: {
        ItemRef: QuickBooksRefModel;
    };
    Description?: string;
    LineNum?: number;
}

export type CreateQuickBooksInvoiceLines =
    CreateQuickBooksInvoiceSalesItemLineDto |
    CreateQuickBooksInvoiceGroupLineDto |
    CreateQuickBooksInvoiceDescriptionOnlyLineDto |
    CreateQuickBooksInvoiceDiscountLineDto |
    CreateQuickBooksInvoiceSubTotalLineModel;

export interface CreateQuickBooksInvoicesDto extends QuickBooksInvoicesDto {
    CustomerRef: QuickBooksRefDto;
    Line: CreateQuickBooksInvoiceLines[];
    CurrencyRef?: QuickBooksRefDto;
}

export interface UpdateQuickBooksInvoiceSalesItemLineDto extends CreateQuickBooksInvoiceSalesItemLineDto {
    Id: string;
}

export interface UpdateQuickBooksInvoiceGroupLineDto extends CreateQuickBooksInvoiceGroupLineDto {
    Id: string;
}

export interface UpdateQuickBooksInvoiceDescriptionOnlyLineDto extends CreateQuickBooksInvoiceDescriptionOnlyLineDto {
    Id: string;
}

export interface UpdateQuickBooksInvoiceDiscountLineDto extends CreateQuickBooksInvoiceDiscountLineDto {
    Id: string;
}

export interface UpdateQuickBooksInvoiceSubTotalLineModel extends CreateQuickBooksInvoiceSubTotalLineModel {
    Id: string;
}

export type UpdateQuickBooksInvoiceLines =
    UpdateQuickBooksInvoiceSalesItemLineDto |
    UpdateQuickBooksInvoiceGroupLineDto |
    UpdateQuickBooksInvoiceDescriptionOnlyLineDto |
    UpdateQuickBooksInvoiceDiscountLineDto |
    UpdateQuickBooksInvoiceSubTotalLineModel;

export interface FullUpdateQuickBooksInvoicesDto extends QuickBooksInvoicesDto {
    CustomerRef: QuickBooksRefDto;
    Line: UpdateQuickBooksInvoiceLines[];
}

export interface SparseUpdateQuickBooksInvoicesDto extends QuickBooksInvoicesDto {
    CustomerRef?: QuickBooksRefDto;
    Line?: UpdateQuickBooksInvoiceLines[];
}
