import {
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
import { QuickBooksCustomFieldModel, QuickBooksDateModel, QuickBooksRefModel } from "../../common/models";
import { QuickBooksCurrencyRefDto } from "../../common/dto/currency-ref.dto";

export interface QuickBooksEstimateDto {
    DocNumber?: string;
    BillEmail?: QuickBooksEmailDto;
    TxnDate?: string;
    ShipFromAddr?: QuickBooksPhysicalAddressDto;
    ShipDate?: QuickBooksDateDto;
    ClassRef?: QuickBooksRefDto;
    PrintStatus?: "NotSet" | "NeedToPrint" | "PrintComplete";
    TxnStatus?: "Accepted" | "Closed" | "Pending" | "Rejected";
    SalesTermRef?: QuickBooksRefDto;
    TxnSource?: string;
    LinkedTxn?: QuickBooksLinkedTxnDto[];
    GlobalTaxCalculation?: QuickBooksGlobalTaxCalculationsEnum;
    AcceptedDate?: string;
    ExpirationDate?: QuickBooksDateModel;
    DueDate?: QuickBooksDateModel;
    PrivateNote?: string;
    CustomerMemo?: QuickBooksMemoRefDto;
    EmailStatus?: QuickBooksEmailStatusesEnum;
    ExchangeRate?: number;
    TxnTaxDetail?: QuickBooksTxnTaxDetailDto;
    AcceptedBy?: string;
    ShipAddr?: QuickBooksPhysicalAddressDto;
    DepartmentRef?: QuickBooksRefDto;
    BillAddr?: QuickBooksPhysicalAddressDto;
    ApplyTaxAfterDiscount?: boolean;
    CustomField?: QuickBooksCustomFieldModel[];
}

export interface CreateQuickBooksEstimateSalesItemLineDto {
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

export interface CreateQuickBooksEstimateGroupLineDto {
    DetailType: "GroupLineDetail";
    GroupLineDetail: {
        Quantity?: number;
        GroupItemRef?: QuickBooksRefDto;
        Line?: CreateQuickBooksEstimateSalesItemLineDto[];
    };
    Description?: string;
    LineNum?: number;
}

export interface CreateQuickBooksEstimateDescriptionOnlyLineDto {
    DetailType: "DescriptionOnly";
    DescriptionLineDetail: {
        TaxCodeRef?: QuickBooksRefDto;
        ServiceDate?: QuickBooksDateDto;
    };
    Description?: string;
    LineNum?: number;
}

export interface CreateQuickBooksEstimateDiscountLineDto {
    DetailType: "DiscountLineDetail";
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

export interface CreateQuickBooksEstimateSubTotalLineDto {
    DetailType: "SubTotalLineDetail";
    Amount: number;
    SubtotalLineDetail: {
        ItemRef: QuickBooksRefModel;
    };
    Description?: string;
    LineNum?: number;
}

export type CreateQuickBooksEstimateLines =
    CreateQuickBooksEstimateSalesItemLineDto |
    CreateQuickBooksEstimateGroupLineDto |
    CreateQuickBooksEstimateDescriptionOnlyLineDto |
    CreateQuickBooksEstimateDiscountLineDto |
    CreateQuickBooksEstimateSubTotalLineDto;

export interface CreateQuickBooksEstimateDto extends QuickBooksEstimateDto {
    CustomerRef: QuickBooksRefDto;
    Line: CreateQuickBooksEstimateLines[];
    CurrencyRef?: QuickBooksCurrencyRefDto;
}

export interface UpdateQuickBooksEstimateSalesItemLineDto extends CreateQuickBooksEstimateSalesItemLineDto {
    Id: string;
}

export interface UpdateQuickBooksEstimateGroupLineDto extends CreateQuickBooksEstimateGroupLineDto {
    Id: string;
}

export interface UpdateQuickBooksEstimateDescriptionOnlyLineDto extends CreateQuickBooksEstimateDescriptionOnlyLineDto {
    Id: string;
}

export interface UpdateQuickBooksEstimateDiscountLineDto extends CreateQuickBooksEstimateDiscountLineDto {
    Id: string;
}

export interface UpdateQuickBooksEstimateSubTotalLineDto extends CreateQuickBooksEstimateSubTotalLineDto {
    Id: string;
}

export type UpdateQuickBooksEstimateLines =
    UpdateQuickBooksEstimateSalesItemLineDto |
    UpdateQuickBooksEstimateGroupLineDto |
    UpdateQuickBooksEstimateDescriptionOnlyLineDto |
    UpdateQuickBooksEstimateDiscountLineDto |
    UpdateQuickBooksEstimateSubTotalLineDto;

export interface FullUpdateQuickBooksEstimateDto extends QuickBooksEstimateDto {
    CustomerRef: QuickBooksRefDto;
    Line: UpdateQuickBooksEstimateLines[];
}

export interface SparseUpdateQuickBooksEstimateDto extends QuickBooksEstimateDto {
    CustomerRef?: QuickBooksRefDto;
    Line?: UpdateQuickBooksEstimateLines[];
}
