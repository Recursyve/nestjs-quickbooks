import { QuickBooksQueryResponseModel, QuickBooksResponseModel } from "../../common";
import { QuickBooksEstimates } from "./estimates.model";

export interface QuickBooksEstimatesResponseModel extends QuickBooksResponseModel {
    Estimate: QuickBooksEstimates;
}

export interface QuickBooksEstimatesQueryResponseModel extends QuickBooksResponseModel {
    QueryResponse: QuickBooksQueryResponseModel & { Estimate: QuickBooksEstimates[]; };
}
