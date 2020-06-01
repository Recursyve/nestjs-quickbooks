import { QuickBooksQueryResponseModel, QuickBooksResponseModel } from "../../common/models";
import { QuickBooksPaymentMethods } from "./payment-methods.model";

export interface QuickBooksPaymentMethodsResponseModel extends QuickBooksResponseModel {
    PaymentMethod: QuickBooksPaymentMethods;
}

export interface QuickBooksPaymentMethodsQueryResponseModel extends QuickBooksResponseModel {
    QueryResponse: QuickBooksQueryResponseModel & { PaymentMethod: QuickBooksPaymentMethods[]; };
}
