import { QuickBooksQueryResponseModel, QuickBooksResponseModel } from "../../common/models";
import { QuickBooksPayments } from "./payments.model";

export interface QuickBooksPaymentsResponseModel {
    Payment: QuickBooksPayments;
}

export interface QuickBooksPaymentsQueryResponseModel extends QuickBooksResponseModel {
    QueryResponse: QuickBooksQueryResponseModel & { Invoice: QuickBooksPayments[]; };
}

export interface QuickBooksPaymentsDeleteResponseModel extends QuickBooksResponseModel {
    Payment: {
        Id: string;
        status: string;
        domain: number;
    };
}
