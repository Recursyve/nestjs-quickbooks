import { QuickBooksQueryModel } from "../../common/models/quickbooks.model";

export interface QuickBooksCustomersQuery extends QuickBooksQueryModel {
    DisplayName: string;
    GivenName: string;
    MiddleName: string;
    FamilyName: string;
    PrimaryEmailAddr: string;
    Active: boolean;
    Balance: number;
    CompanyName: string;
    PrintOnCheckName: string;
    FullyQualifiedName: string;
}
