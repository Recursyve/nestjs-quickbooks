import { QuickBooksEmailModel, QuickBooksQueryModel } from "../../common/models";

export interface QuickBooksCustomersQuery extends QuickBooksQueryModel {
    DisplayName: string;
    GivenName: string;
    MiddleName: string;
    FamilyName: string;
    PrimaryEmailAddr: QuickBooksEmailModel;
    Active: boolean;
    Balance: number;
    CompanyName: string;
    PrintOnCheckName: string;
    FullyQualifiedName: string;
}
