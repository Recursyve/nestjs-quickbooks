import { QuickBooksRefDto } from "../../common/dto/ref.dto";
import { QuickBooksPhoneNumberDto } from "../../common/dto/phone-number.dto";
import { QuickBooksEmailDto } from "../../common/dto/email.dto";

export interface QuickBooksVendorWithDisplayName {
    DisplayName: string;
    Suffix?: string;
    Title?: string;
    MiddleName?: string;
    FamilyName?: string;
    GivenName?: string;
}

export interface QuickBooksVendorWithSuffix {
    DisplayName?: string;
    Suffix: string;
    Title?: string;
    MiddleName?: string;
    FamilyName?: string;
    GivenName?: string;
}

export interface QuickBooksVendorWithTitle {
    DisplayName?: string;
    Suffix?: string;
    Title: string;
    MiddleName?: string;
    FamilyName?: string;
    GivenName?: string;
}

export interface QuickBooksVendorWithMiddleName {
    DisplayName?: string;
    Suffix?: string;
    Title?: string;
    MiddleName: string;
    FamilyName?: string;
    GivenName?: string;
}

export interface QuickBooksVendorWithFamilyName {
    DisplayName?: string;
    Suffix?: string;
    Title?: string;
    MiddleName?: string;
    FamilyName: string;
    GivenName?: string;
}

export interface QuickBooksVendorWithGivenName {
    DisplayName?: string;
    Suffix?: string;
    Title?: string;
    MiddleName?: string;
    FamilyName?: string;
    GivenName: string;
}

export interface QuickBooksVendorsAddressDto {
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

export interface QuickBooksVendorDto {
    PrimaryEmailAddr?: QuickBooksEmailDto;
    OtherContactInfo?: string;
    SecondaryTaxIdentifier?: string;
    APAccountRef?: QuickBooksRefDto;
    TermRef?: QuickBooksRefDto;
    GSTIN?: string;
    Fax?: QuickBooksPhoneNumberDto;
    BusinessNumber?: string;
    HasTPAR?: boolean;
    TaxReportingBasis?: boolean;
    Mobile?: QuickBooksPhoneNumberDto;
    PrimaryPhone?: QuickBooksPhoneNumberDto;
    Active?: boolean;
    AlternatePhone?: QuickBooksPhoneNumberDto;
    Vendor1099?: boolean;
    BillRate?: number;
    WebAddr?: number;
    CompanyName?: string;
    TaxIdentifier?: string;
    AcctNum?: string;
    GSTRegistrationType?: string;
    PrintOnCheckName?: string;
    BillAddr?: QuickBooksVendorsAddressDto;
}

export type CreateQuickBooksVendorDto = (
    QuickBooksVendorWithDisplayName |
    QuickBooksVendorWithSuffix |
    QuickBooksVendorWithTitle |
    QuickBooksVendorWithMiddleName |
    QuickBooksVendorWithFamilyName |
    QuickBooksVendorWithGivenName
) & QuickBooksVendorDto;

export type FullUpdateQuickBooksVendorDto = (
    QuickBooksVendorWithDisplayName |
    QuickBooksVendorWithSuffix |
    QuickBooksVendorWithTitle |
    QuickBooksVendorWithMiddleName |
    QuickBooksVendorWithFamilyName |
    QuickBooksVendorWithGivenName
) & QuickBooksVendorDto;

export type SparseUpdateQuickBooksVendorDto = (
    QuickBooksVendorWithDisplayName |
    QuickBooksVendorWithSuffix |
    QuickBooksVendorWithTitle |
    QuickBooksVendorWithMiddleName |
    QuickBooksVendorWithFamilyName |
    QuickBooksVendorWithGivenName
) & QuickBooksVendorDto;
