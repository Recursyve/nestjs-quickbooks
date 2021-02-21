import {
    QuickBooksDateModel,
    QuickBooksEmailModel,
    QuickBooksModel,
    QuickBooksPhoneNumberModel,
    QuickBooksPhysicalAddressModel
} from "../../common/models";

export interface QuickBooksEmployees extends QuickBooksModel {
    PrimaryAddr: QuickBooksPhysicalAddressModel;
    PrimaryEmailAddr: QuickBooksEmailModel;
    EmployeeNumber: string;
    PrintOnCheckName: string;
    DisplayName: string;
    GivenName: string;
    MiddleName: string;
    Suffix: string;
    FamilyName: string;
    Title: string;
    BillableTime: boolean;
    BirthDate: QuickBooksDateModel;
    SSN: string;
    PrimaryPhone: QuickBooksPhoneNumberModel;
    Mobile: QuickBooksPhoneNumberModel;
    Active: boolean;
    ReleasedDate: QuickBooksDateModel;
    Gender: "Male" | "Female";
    HiredDate: QuickBooksDateModel;
    BillRate: number;
    Organization: boolean;
    V4IDPseudonym: string;
}
