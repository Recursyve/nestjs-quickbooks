import {
    QuickBooksDeleteResponseModel,
    QuickBooksQueryResponseModel,
    QuickBooksResponseModel
} from "../../common/models";
import { QuickBooksInvoices } from "./invoices.model";

export interface QuickBooksInvoicesResponseModel extends QuickBooksResponseModel {
    Invoice: QuickBooksInvoices;
}

export interface QuickBooksInvoicesQueryResponseModel extends QuickBooksResponseModel {
    QueryResponse: QuickBooksQueryResponseModel & { Invoice: QuickBooksInvoices[]; };
}

export interface QuickBooksInvoicesDeleteResponseModel extends QuickBooksResponseModel {
    Invoice: QuickBooksDeleteResponseModel;
}
