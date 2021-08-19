import { QuickBooksQueryModel, QuickBooksRefModel } from "../../common/models";

export interface QuickBooksBillsQueryModel extends QuickBooksQueryModel {
    VendorRef: QuickBooksRefModel;
    TxnDate: string;
    APAccountRef: QuickBooksRefModel;
    SalesTermRef: QuickBooksRefModel;
    TotalAmt: number;
    DueDate: string;
    DocNumber: string;
    Balance: number;
}
