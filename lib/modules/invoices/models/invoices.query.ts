import { QuickbooksModel } from "../../common/models/quickbooks.model";

export interface InvoicesQuery extends QuickbooksModel {
    CustomerRef: string;
    DocNumber: string;
    TxnDate: string;
    DueDate: string;
    Balance: number;
}
