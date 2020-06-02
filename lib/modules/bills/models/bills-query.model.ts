import { QuickBooksDateModel, QuickBooksQueryModel, QuickBooksRefModel } from "../../common/models";

export interface QuickBooksBillsQueryModel extends QuickBooksQueryModel {
    VendorRef: QuickBooksRefModel;
    TxnDate: string;
    APAccountRef: QuickBooksRefModel;
    SalesTermRef: QuickBooksRefModel;
    TotalAmt: number;
    DueDate: QuickBooksDateModel;
    DocNumber: string;
    Balance: number;
}
