import { QuickBooksQueryModel } from "../../common/models";

export interface QuickBooksEmployeesQueryModel extends QuickBooksQueryModel {
    DisplayName: string;
    GivenName: string;
    MiddleName: string;
    FamilyName: string;
    Suffix: string;
    Active: boolean;
    PrintOnCheckName: string;
}
