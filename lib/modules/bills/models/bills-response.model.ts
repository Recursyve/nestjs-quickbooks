import {
    QuickBooksDeleteResponseModel,
    QuickBooksQueryResponseModel,
    QuickBooksResponseModel
} from "../../common/models";
import { QuickBooksBills } from "./bills.model";
import { QuickBooksInvoicesDeleteResponseModel } from "../../invoices";

export interface QuickBooksBillsResponseModel extends QuickBooksResponseModel {
    Bill: QuickBooksBills;
}

export interface QuickBooksBillsQueryResponseModel extends QuickBooksResponseModel {
    QueryResponse: QuickBooksQueryResponseModel & { Bill: QuickBooksBills[]; };
}

export interface QuickBooksBillsDeleteResponseModel extends QuickBooksInvoicesDeleteResponseModel {
    Bill: QuickBooksDeleteResponseModel;
}
