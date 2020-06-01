import { QuickBooksQueryModel } from "../../common/models";

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
