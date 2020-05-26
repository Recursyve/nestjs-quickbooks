import { QuickbooksModel } from "../../common/models/quickbooks.model";

export interface PaymentsQuery extends QuickbooksModel {
    TotalAmt: number;
    CustomerRef: string;
    TxnDate: string;
    PaymentRefNum: string;
}
