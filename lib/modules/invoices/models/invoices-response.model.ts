import { QuickBooksQueryResponseModel, QuickBooksResponseModel } from "../../common/models";
import { QuickBooksInvoices } from "./invoices.model";

export interface QuickBooksInvoicesResponseModel extends QuickBooksResponseModel {
    Customer: QuickBooksInvoices;
}

export interface QuickBooksInvoicesQueryResponseModel extends QuickBooksResponseModel {
    QueryResponse: QuickBooksQueryResponseModel & { Invoice: QuickBooksInvoices[]; };
}

export interface QuickBooksInvoicesDeleteResponse extends QuickBooksResponseModel {
    Invoice: {
        Id: string;
        status: string;
        domain: number;
    };
}
