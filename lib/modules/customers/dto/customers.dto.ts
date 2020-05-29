import { QuickBooksEmailDto } from "../../common/dto/email.dto";
import { QuickBooksPhoneNumberDto } from "../../common/dto/phone-number.dto";
import { QuickBooksPhysicalAddressDto } from "../../common/dto";

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

export interface QuickBooksCustomersDto {
    PrimaryEmailAddr?: QuickBooksEmailDto;
    BillWithParent?: boolean;
    FullyQualifiedName?: string;
    CompanyName?: string;
    PrimaryPhone?: QuickBooksPhoneNumberDto;
    Active?: boolean;
    Job?: boolean;
    BalanceWithJobs?: number;
    BillAddr?: QuickBooksPhysicalAddressDto;
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

export type FullUpdateQuickBooksCustomersDto = (
    QuickBooksCustomerWithDisplayName |
    QuickBooksCustomerWithSuffix |
    QuickBooksCustomerWithTitle |
    QuickBooksCustomerWithMiddleName |
    QuickBooksCustomerWithFamilyName |
    QuickBooksCustomerWithGivenName
) & QuickBooksCustomersDto;

export type SparseUpdateQuickBooksCustomersDto = (
    QuickBooksCustomerWithDisplayName |
    QuickBooksCustomerWithSuffix |
    QuickBooksCustomerWithTitle |
    QuickBooksCustomerWithMiddleName |
    QuickBooksCustomerWithFamilyName |
    QuickBooksCustomerWithGivenName
) & QuickBooksCustomersDto;
