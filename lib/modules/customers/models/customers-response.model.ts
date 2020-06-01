import { QuickBooksCustomers } from "./customers.model";
import { QuickBooksQueryResponseModel, QuickBooksResponseModel } from "../../common/models";

export interface QuickBooksCustomersResponseModel extends QuickBooksResponseModel {
    Customer: QuickBooksCustomers;
}

export interface QuickBooksCustomersQueryResponseModel extends QuickBooksResponseModel {
    QueryResponse: QuickBooksQueryResponseModel & { Customer: QuickBooksCustomers[]; };
}
