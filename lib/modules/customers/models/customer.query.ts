import { QuickbooksModel } from "../../common/models/quickbooks.model";

export interface CustomerQuery extends QuickbooksModel {
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
