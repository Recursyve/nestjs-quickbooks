import { QuickBooksEmailDto } from "../../common/dto/email.dto";
import { QuickBooksPhoneNumberDto } from "../../common/dto/phone-number.dto";

export interface QuickBooksCustomerWithDisplayName {
    DisplayName: string;
    Suffix?: string;
    Title?: string;
    MiddleName?: string;
    FamilyName?: string;
    GivenName?: string;
}

export interface QuickBooksCustomerWithSuffix {
    DisplayName?: string;
    Suffix: string;
    Title?: string;
    MiddleName?: string;
    FamilyName?: string;
    GivenName?: string;
}

export interface QuickBooksCustomerWithTitle {
    DisplayName?: string;
    Suffix?: string;
    Title: string;
    MiddleName?: string;
    FamilyName?: string;
    GivenName?: string;
}

export interface QuickBooksCustomerWithMiddleName {
    DisplayName?: string;
    Suffix?: string;
    Title?: string;
    MiddleName: string;
    FamilyName?: string;
    GivenName?: string;
}

export interface QuickBooksCustomerWithFamilyName {
    DisplayName?: string;
    Suffix?: string;
    Title?: string;
    MiddleName?: string;
    FamilyName: string;
    GivenName?: string;
}

export interface QuickBooksCustomerWithGivenName {
    DisplayName?: string;
    Suffix?: string;
    Title?: string;
    MiddleName?: string;
    FamilyName?: string;
    GivenName: string;
}

export interface QuickBooksCustomersAddressDto {
    PostalCode?: string;
    City?: string;
    Country?: string;
    Line5?: string;
    Line4?: string;
    Line3?: string;
    Line2?: string;
    Line1?: string;
    CountrySubDivisionCode?: string;
}

export interface QuickBooksCustomersDto {
    PrimaryEmailAddr?: QuickBooksEmailDto;
    BillWithParent?: boolean;
    FullyQualifiedName?: string;
    CompanyName?: string;
    PrimaryPhone?: QuickBooksPhoneNumberDto;
    Active?: boolean;
    Job?: boolean;
    BalanceWithJobs?: number;
    BillAddr?: QuickBooksCustomersAddressDto;
    PreferredDeliveryMethod?: string;
    Taxable?: number;
    PrintOnCheckName?: string;
    Balance?: number;
}

export type CreateQuickBooksCustomersDto = (
    QuickBooksCustomerWithDisplayName |
    QuickBooksCustomerWithSuffix |
    QuickBooksCustomerWithTitle |
    QuickBooksCustomerWithMiddleName |
    QuickBooksCustomerWithFamilyName |
    QuickBooksCustomerWithGivenName
) & QuickBooksCustomersDto;

export type FullQuickBooksUpdateCustomersDto = (
    QuickBooksCustomerWithDisplayName |
    QuickBooksCustomerWithSuffix |
    QuickBooksCustomerWithTitle |
    QuickBooksCustomerWithMiddleName |
    QuickBooksCustomerWithFamilyName |
    QuickBooksCustomerWithGivenName
) & QuickBooksCustomersDto;

export type SparseQuickBooksUpdateCustomersDto = (
    QuickBooksCustomerWithDisplayName |
    QuickBooksCustomerWithSuffix |
    QuickBooksCustomerWithTitle |
    QuickBooksCustomerWithMiddleName |
    QuickBooksCustomerWithFamilyName |
    QuickBooksCustomerWithGivenName
) & QuickBooksCustomersDto;
