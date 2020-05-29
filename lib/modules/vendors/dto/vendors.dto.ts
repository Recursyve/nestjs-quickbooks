import {
    QuickBooksEmailDto,
    QuickBooksPhoneNumberDto,
    QuickBooksPhysicalAddressDto,
    QuickBooksRefDto,
    QuickBooksWebsiteDto
} from "../../common/dto";

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
    WebAddr?: QuickBooksWebsiteDto;
    CompanyName?: string;
    TaxIdentifier?: string;
    AcctNum?: string;
    GSTRegistrationType?: string;
    PrintOnCheckName?: string;
    BillAddr?: QuickBooksPhysicalAddressDto;
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
