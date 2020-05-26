import {
    QuickBooksCustomersAddress, QuickBooksCustomersEmail, QuickBooksCustomersPhone
} from "../models/customers.model";

export interface CustomerWithDisplayName {
    DisplayName: string;
    Suffix?: string;
    Title?: string;
    MiddleName?: string;
    FamilyName?: string;
    GivenName?: string;
}

export interface CustomerWithSuffix {
    DisplayName?: string;
    Suffix: string;
    Title?: string;
    MiddleName?: string;
    FamilyName?: string;
    GivenName?: string;
}

export interface CustomerWithTitle {
    DisplayName?: string;
    Suffix?: string;
    Title: string;
    MiddleName?: string;
    FamilyName?: string;
    GivenName?: string;
}

export interface CustomerWithMiddleName {
    DisplayName?: string;
    Suffix?: string;
    Title?: string;
    MiddleName: string;
    FamilyName?: string;
    GivenName?: string;
}

export interface CustomerWithFamilyName {
    DisplayName?: string;
    Suffix?: string;
    Title?: string;
    MiddleName?: string;
    FamilyName: string;
    GivenName?: string;
}

export interface CustomerWithGivenName {
    DisplayName?: string;
    Suffix?: string;
    Title?: string;
    MiddleName?: string;
    FamilyName?: string;
    GivenName: string;
}

export interface CustomersAddressDto {
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

export interface CustomerDto {
    PrimaryEmailAddr?: QuickBooksCustomersEmail;
    BillWithParent?: boolean;
    FullyQualifiedName?: string;
    CompanyName?: string;
    PrimaryPhone?: QuickBooksCustomersPhone;
    Active?: boolean;
    Job?: boolean;
    BalanceWithJobs?: number;
    BillAddr?: CustomersAddressDto;
    PreferredDeliveryMethod?: string;
    Taxable?: number;
    PrintOnCheckName?: string;
    Balance?: number;
}

export type CreateCustomerDto = (
    CustomerWithDisplayName |
    CustomerWithSuffix |
    CustomerWithTitle |
    CustomerWithMiddleName |
    CustomerWithFamilyName |
    CustomerWithGivenName
) & CustomerDto;

export type FullUpdateCustomerDto = (
    CustomerWithDisplayName |
    CustomerWithSuffix |
    CustomerWithTitle |
    CustomerWithMiddleName |
    CustomerWithFamilyName |
    CustomerWithGivenName
) & CustomerDto;

export type SparseUpdateCustomerDto = (
    CustomerWithDisplayName |
    CustomerWithSuffix |
    CustomerWithTitle |
    CustomerWithMiddleName |
    CustomerWithFamilyName |
    CustomerWithGivenName
) & CustomerDto;
