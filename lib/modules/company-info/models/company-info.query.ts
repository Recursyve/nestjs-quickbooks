import { QuickBooksQueryModel, QuickBooksResponseModel } from "../../common/models";
import { QuickBooksCompanyInfo } from "./company-info.model";

export interface QuickBooksCompanyInfoQuery extends QuickBooksQueryModel {
}

export interface QuickBooksCompanyInfoQueryResponse extends QuickBooksResponseModel {
    CompanyInfo: QuickBooksCompanyInfo;
}
