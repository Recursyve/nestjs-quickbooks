import { QuickBooksQueryModel, QuickBooksResponseModel } from "../../common/models";
import { QuickBooksVendors } from "./vendors.model";

export interface QuickBooksVendorsQuery extends QuickBooksQueryModel {
    DisplayName: string;
    GivenName: string;
    MiddleName: string;
    FamilyName: string;
    Suffix: string;
    Active: boolean;
    Balance: number;
    CompanyName: string;
    PrintOnCheckName: string;
}

export interface QuickBooksVendorsQueryResponse extends QuickBooksResponseModel {
    QueryResponse: {
        Vendor: QuickBooksVendors[];
        startPosition: number;
        maxResults: number;
    };
}
