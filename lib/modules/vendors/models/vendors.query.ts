import { QuickbooksModel } from "../../common/models/quickbooks.model";

export interface VendorsQuery extends QuickbooksModel {
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
