import {
    QuickBooksDeleteResponseModel,
    QuickBooksQueryResponseModel,
    QuickBooksResponseModel
} from "../../common/models";
import { QuickBooksPayments } from "./payments.model";

export interface QuickBooksPaymentsResponseModel {
    Payment: QuickBooksPayments;
}

export interface QuickBooksPaymentsQueryResponseModel extends QuickBooksResponseModel {
    QueryResponse: QuickBooksQueryResponseModel & { Payment: QuickBooksPayments[]; };
}

export interface QuickBooksPaymentsDeleteResponseModel extends QuickBooksResponseModel {
    Payment: QuickBooksDeleteResponseModel;
}
