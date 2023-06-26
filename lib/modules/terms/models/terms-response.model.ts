import { QuickBooksQueryResponseModel, QuickBooksResponseModel } from "../../common";
import { QuickBooksTerms } from "./terms.model";

export interface QuickBooksTermsResponseModel extends QuickBooksResponseModel {
    Term: QuickBooksTerms;
}

export interface QuickBooksTermsQueryResponseModel extends QuickBooksResponseModel {
    QueryResponse: QuickBooksQueryResponseModel & { Term: QuickBooksTerms[]; };
}
