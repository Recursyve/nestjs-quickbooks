import {
    QuickBooksEmailDto,
    QuickBooksPhoneNumberDto,
    QuickBooksPhysicalAddressDto,
    QuickBooksRefDto,
    QuickBooksWebsiteDto
} from "../../common/dto";

export interface QuickBooksVendorWithDisplayName {
    Title?: string;
    GivenName?: string;
    MiddleName?: string;
    Suffix?: string;
    FamilyName?: string;
    DisplayName: string;
}

export interface QuickBooksVendorWithSuffix {
    Title?: string;
    GivenName?: string;
    MiddleName?: string;
    Suffix: string;
    FamilyName?: string;
}

export interface QuickBooksVendorWithTitle {
    Title: string;
    GivenName?: string;
    MiddleName?: string;
    Suffix?: string;
    FamilyName?: string;
    DisplayName?: string;
}

export interface QuickBooksVendorWithMiddleName {
    Title?: string;
    GivenName?: string;
    MiddleName: string;
    Suffix?: string;
    FamilyName?: string;
    DisplayName?: string;
}

export interface QuickBooksVendorWithFamilyName {
    Title?: string;
    GivenName?: string;
    MiddleName?: string;
    Suffix?: string;
    FamilyName: string;
    DisplayName?: string;
}

export interface QuickBooksVendorWithGivenName {
    Title?: string;
    GivenName: string;
    MiddleName?: string;
    Suffix?: string;
    FamilyName?: string;
    DisplayName?: string;
}

export interface QuickBooksVendorPaymentBankDetailDto {
    BankAccountName: string;
    BankBranchIdentifier: string;
    BankAccountNumber: string;
    StatementText: string;
}

export interface QuickBooksVendorsDto {
    PrimaryEmailAddr?: QuickBooksEmailDto;
    OtherContactInfo?: string;
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
    VendorPaymentBankDetail?: QuickBooksVendorPaymentBankDetailDto;
    TaxIdentifier?: string;
    AcctNum?: string;
    GSTRegistrationType?: string;
    PrintOnCheckName?: string;
    BillAddr?: QuickBooksPhysicalAddressDto;
}

export type CreateQuickBooksVendorsDto = (
    QuickBooksVendorWithDisplayName |
    QuickBooksVendorWithSuffix |
    QuickBooksVendorWithTitle |
    QuickBooksVendorWithMiddleName |
    QuickBooksVendorWithFamilyName |
    QuickBooksVendorWithGivenName
) & QuickBooksVendorsDto;

export type FullUpdateQuickBooksVendorsDto = (
    QuickBooksVendorWithDisplayName |
    QuickBooksVendorWithSuffix |
    QuickBooksVendorWithTitle |
    QuickBooksVendorWithMiddleName |
    QuickBooksVendorWithFamilyName |
    QuickBooksVendorWithGivenName
) & QuickBooksVendorsDto;
