import {
    QuickBooksDateDto,
    QuickBooksEmailDto,
    QuickBooksPhoneNumberDto,
    QuickBooksPhysicalAddressDto,
    QuickBooksRefDto,
    QuickBooksWebsiteDto
} from "../../common/dto";

export interface QuickBooksEmployeeWithDisplayName {
    Title?: string;
    GivenName?: string;
    MiddleName?: string;
    Suffix?: string;
    FamilyName?: string;
    DisplayName: string;
}

export interface QuickBooksEmployeeWithSuffix {
    Title?: string;
    GivenName?: string;
    MiddleName?: string;
    Suffix: string;
    FamilyName?: string;
}

export interface QuickBooksEmployeeWithTitle {
    Title: string;
    GivenName?: string;
    MiddleName?: string;
    Suffix?: string;
    FamilyName?: string;
    DisplayName?: string;
}

export interface QuickBooksEmployeeWithMiddleName {
    Title?: string;
    GivenName?: string;
    MiddleName: string;
    Suffix?: string;
    FamilyName?: string;
    DisplayName?: string;
}

export interface QuickBooksEmployeeWithFamilyName {
    Title?: string;
    GivenName?: string;
    MiddleName?: string;
    Suffix?: string;
    FamilyName: string;
    DisplayName?: string;
}

export interface QuickBooksEmployeeWithGivenName {
    Title?: string;
    GivenName: string;
    MiddleName?: string;
    Suffix?: string;
    FamilyName?: string;
    DisplayName?: string;
}

export interface QuickBooksEmployeesDto {
    PrimaryAddr: QuickBooksPhysicalAddressDto;
    PrimaryEmailAddr?: QuickBooksEmailDto;
    BillableTime?: boolean;
    BirthDate?: QuickBooksDateDto;
    SSN?: string;
    PrimaryPhone?: QuickBooksPhoneNumberDto;
    Mobile?: QuickBooksPhoneNumberDto;
    Active?: boolean;
    ReleasedDate?: QuickBooksDateDto;
    HiredDate?: QuickBooksDateDto;
    Gender?: "Male" | "Female";
    BillRate?: number;
    Organization?: boolean;
    PrintOnCheckName?: string;
    EmployeeNumber?: string;
}

export type CreateQuickBooksEmployeesDto = (
    QuickBooksEmployeeWithDisplayName |
    QuickBooksEmployeeWithSuffix |
    QuickBooksEmployeeWithTitle |
    QuickBooksEmployeeWithMiddleName |
    QuickBooksEmployeeWithFamilyName |
    QuickBooksEmployeeWithGivenName
) & QuickBooksEmployeesDto;

export type FullUpdateQuickBooksEmployeesDto = (
    QuickBooksEmployeeWithDisplayName |
    QuickBooksEmployeeWithSuffix |
    QuickBooksEmployeeWithTitle |
    QuickBooksEmployeeWithMiddleName |
    QuickBooksEmployeeWithFamilyName |
    QuickBooksEmployeeWithGivenName
) & QuickBooksEmployeesDto;
