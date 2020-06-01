import { QuickBooksQueryModel } from "../../common/models";

export interface QuickBooksInvoicesQueryModel extends QuickBooksQueryModel {
    CustomerRef: string;
    DocNumber: string;
    TxnDate: string;
    DueDate: string;
    Balance: number;
}
