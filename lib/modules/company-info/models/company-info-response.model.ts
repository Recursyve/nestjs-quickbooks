import { QuickBooksResponseModel } from "../../common/models";
import { QuickBooksCompanyInfo } from "./company-info.model";

export interface QuickBooksCompanyInfoResponseModel extends QuickBooksResponseModel {
    CompanyInfo: QuickBooksCompanyInfo;
}

export interface QuickBooksCompanyInfoQueryResponseModel extends QuickBooksResponseModel {
    CompanyInfo: QuickBooksCompanyInfo;
}
