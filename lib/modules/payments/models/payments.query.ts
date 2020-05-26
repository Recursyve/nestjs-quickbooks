import { QuickBooksQueryModel } from "../../common/models/quickbooks.model";

export interface QuickBooksPaymentsQuery extends QuickBooksQueryModel {
    TotalAmt: number;
    CustomerRef: string;
    TxnDate: string;
    PaymentRefNum: string;
}
