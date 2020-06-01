import { QuickBooksQueryModel } from "../../common/models";

export interface QuickBooksPaymentsQueryModel extends QuickBooksQueryModel {
    TotalAmt: number;
    CustomerRef: string;
    TxnDate: string;
    PaymentRefNum: string;
}
