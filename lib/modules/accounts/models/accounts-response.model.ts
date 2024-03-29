import { QuickBooksAccounts } from "./accounts.model";
import {QuickBooksDeleteResponseModel, QuickBooksResponseModel} from "../../common";

export interface QuickBooksAccountsResponseModel extends QuickBooksResponseModel {
    Account: QuickBooksAccounts;
}

export interface QuickBooksAccountsQueryResponseModel extends QuickBooksResponseModel {
    QueryResponse: QuickBooksResponseModel & { Account: QuickBooksAccounts[]; };
}

export interface QuickBooksAccountsDeleteResponseModel extends  QuickBooksResponseModel {
    Account: QuickBooksDeleteResponseModel;
}
