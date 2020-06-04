import { QuickBooksBillableStatusesEnum, QuickBooksGlobalTaxCalculationsEnum } from "../../common/enums";
import {
    QuickBooksDateDto,
    QuickBooksLinkedTxnDto,
    QuickBooksMarkupInfoDto,
    QuickBooksRefDto,
    QuickBooksTxnTaxDetailDto
} from "../../common/dto";

export interface QuickBooksBaseBillLinesDto {
    Amount: number;
    DetailType: "AccountBasedExpenseLineDetail" | "ItemBasedExpenseLineDetail";
    Description?: string;
    LineNum?: number;
}

export interface CreateQuickBooksBillsItemBasedExpenseLineDto {
    ItemBasedExpenseLineDetail: {
        TaxInclusiveAmt?: number;
        ItemRef?: QuickBooksRefDto;
        CustomerRef?: QuickBooksRefDto;
        ClassRef?: QuickBooksRefDto;
        TaxCodeRef?: QuickBooksRefDto;
        MarkupInfo?: QuickBooksMarkupInfoDto;
        BillableStatus?: QuickBooksBillableStatusesEnum;
        Qty?: number;
        UnitPrice?: number
    };
    DetailType: "ItemBasedExpenseLineDetail";
}

export interface CreateQuickBooksBillsAccountBasedExpenseLineDto {
    AccountBasedExpenseLineDetail: {
        AccountRef: QuickBooksRefDto;
        TaxAmount?: number;
        TaxInclusiveAmt?: number;
        ClassRef?: QuickBooksRefDto;
        TaxCodeRef?: QuickBooksRefDto;
        MarkupInfo?: QuickBooksMarkupInfoDto;
        BillableStatus?: QuickBooksBillableStatusesEnum;
        CustomerRef?: QuickBooksRefDto;
    };
    DetailType: "AccountBasedExpenseLineDetail";
}

export type CreateQuickBooksBillLines = (
    CreateQuickBooksBillsItemBasedExpenseLineDto |
    CreateQuickBooksBillsAccountBasedExpenseLineDto
) & QuickBooksBaseBillLinesDto;

export interface UpdateQuickBooksBillsItemBasedExpenseLineDto extends CreateQuickBooksBillsItemBasedExpenseLineDto {
    Id?: string;
}

export interface UpdateQuickBooksBillsAccountBasedExpenseLineDto extends CreateQuickBooksBillsAccountBasedExpenseLineDto {
    Id?: string;
}

export type UpdateQuickBooksBillLines =
    UpdateQuickBooksBillsItemBasedExpenseLineDto |
    UpdateQuickBooksBillsAccountBasedExpenseLineDto;

export interface QuickBooksBillsDto {
    CurrencyRef?: QuickBooksRefDto;
    TxnDate?: string;
    APAccountRef?: QuickBooksRefDto;
    SalesTermRef?: QuickBooksRefDto;
    LinkedTxn?: QuickBooksLinkedTxnDto[];
    GlobalTaxCalculation?: QuickBooksGlobalTaxCalculationsEnum;
    TransactionLocationType?: string;
    DueDate?: string;
    DocNumber?: string;
    PrivateNote?: string;
    TxnTaxDetail?: QuickBooksTxnTaxDetailDto;
    ExchangeRate?: number;
    DepartmentRef?: QuickBooksRefDto;
    IncludeInAnnualTPAR?: boolean;
}

export interface CreateQuickBooksBillsDto extends QuickBooksBillsDto {
    VendorRef: QuickBooksRefDto;
    Line: CreateQuickBooksBillLines[];
}

export interface FullUpdateQuickBooksBillsDto extends QuickBooksBillsDto {
    VendorRef: QuickBooksRefDto;
    Line: UpdateQuickBooksBillLines[];
}
