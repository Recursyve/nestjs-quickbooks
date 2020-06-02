import {
    QuickBooksDateModel,
    QuickBooksLinkedTxnModel,
    QuickBooksMarkupInfoModel,
    QuickBooksModel,
    QuickBooksRefModel,
    QuickBooksTxnTaxDetailModel
} from "../../common/models";
import { QuickBooksBillableStatusesEnum, QuickBooksGlobalTaxCalculationsEnum } from "../../common/enums";

export interface QuickBooksBaseBillLinesModel {
    Id: string;
    Amount: number;
    DetailType: string;
    Description?: string;
    LineNum?: number;
}

export interface QuickBooksBillsItemBasedExpenseLineModel extends QuickBooksBaseBillLinesModel {
    ItemBasedExpenseLineDetail: {
        TaxInclusiveAmt?: number;
        ItemRef?: QuickBooksRefModel;
        CustomerRef?: QuickBooksRefModel;
        PriceLevelRef?: QuickBooksRefModel;
        ClassRef?: QuickBooksRefModel;
        TaxCodeRef?: QuickBooksRefModel;
        MarkupInfo?: QuickBooksMarkupInfoModel;
        BillableStatus?: QuickBooksBillableStatusesEnum;
        Qty?: number;
        UnitPrice?: number
    };
    DetailType: "ItemBasedExpenseLineDetail";
}

export interface QuickBooksBillsAccountBasedExpenseLineModel extends QuickBooksBaseBillLinesModel {
    DetailType: "AccountBasedExpenseLineDetail";
    AccountBasedExpenseLineDetail: {
        AccountRef: QuickBooksRefModel;
        TaxAmount?: number;
        TaxInclusiveAmt?: number;
        ClassRef?: QuickBooksRefModel;
        TaxCodeRef?: QuickBooksRefModel;
        MarkupInfo?: QuickBooksMarkupInfoModel;
        BillableStatus?: QuickBooksBillableStatusesEnum;
        CustomerRef?: QuickBooksRefModel;
    };
}

export type QuickBooksBillLinesModel =
    QuickBooksBillsItemBasedExpenseLineModel |
    QuickBooksBillsAccountBasedExpenseLineModel;

export interface QuickBooksBills extends QuickBooksModel {
    VendorRef: QuickBooksRefModel;
    Line: QuickBooksBillLinesModel[];
    CurrencyRef?: QuickBooksRefModel;
    TxnDate?: string;
    APAccountRef?: QuickBooksRefModel;
    SalesTermRef?: QuickBooksRefModel;
    LinkedTxn?: QuickBooksLinkedTxnModel[];
    GlobalTaxCalculation?: QuickBooksGlobalTaxCalculationsEnum;
    TotalAmt?: number;
    TransactionLocationType?: string;
    DueDate?: QuickBooksDateModel;
    DocNumber?: string;
    PrivateNote?: string;
    TxnTaxDetail?: QuickBooksTxnTaxDetailModel;
    ExchangeRate?: number;
    DepartmentRef?: QuickBooksRefModel;
    IncludeInAnnualTPAR?: boolean;
    HomeBalance: number;
    Balance: number;
}
