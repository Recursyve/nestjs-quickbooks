import { QuickBooksQueryModel } from "../../common/models/quickbooks.model";

export interface QuickBooksInvoicesQuery extends QuickBooksQueryModel {
    CustomerRef: string;
    DocNumber: string;
    TxnDate: string;
    DueDate: string;
    Balance: number;
}
