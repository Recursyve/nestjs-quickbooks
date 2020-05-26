import { RefDto } from "../../common/dto/ref.dto";
import { PhoneNumberDto } from "../../common/dto/phone-number.dto";
import { EmailDto } from "../../common/dto/email.dto";

export interface VendorWithDisplayName {
    DisplayName: string;
    Suffix?: string;
    Title?: string;
    MiddleName?: string;
    FamilyName?: string;
    GivenName?: string;
}

export interface VendorWithSuffix {
    DisplayName?: string;
    Suffix: string;
    Title?: string;
    MiddleName?: string;
    FamilyName?: string;
    GivenName?: string;
}

export interface VendorWithTitle {
    DisplayName?: string;
    Suffix?: string;
    Title: string;
    MiddleName?: string;
    FamilyName?: string;
    GivenName?: string;
}

export interface VendorWithMiddleName {
    DisplayName?: string;
    Suffix?: string;
    Title?: string;
    MiddleName: string;
    FamilyName?: string;
    GivenName?: string;
}

export interface VendorWithFamilyName {
    DisplayName?: string;
    Suffix?: string;
    Title?: string;
    MiddleName?: string;
    FamilyName: string;
    GivenName?: string;
}

export interface VendorWithGivenName {
    DisplayName?: string;
    Suffix?: string;
    Title?: string;
    MiddleName?: string;
    FamilyName?: string;
    GivenName: string;
}

export interface VendorsAddressDto {
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

export interface VendorDto {
    PrimaryEmailAddr?: EmailDto;
    OtherContactInfo?: string;
    SecondaryTaxIdentifier?: string;
    APAccountRef?: RefDto;
    TermRef?: RefDto;
    GSTIN?: string;
    Fax?: PhoneNumberDto;
    BusinessNumber?: string;
    HasTPAR?: boolean;
    TaxReportingBasis?: boolean;
    Mobile?: PhoneNumberDto;
    PrimaryPhone?: PhoneNumberDto;
    Active?: boolean;
    AlternatePhone?: PhoneNumberDto;
    Vendor1099?: boolean;
    BillRate?: number;
    WebAddr?: number;
    CompanyName?: string;
    TaxIdentifier?: string;
    AcctNum?: string;
    GSTRegistrationType?: string;
    PrintOnCheckName?: string;
    BillAddr?: VendorsAddressDto;
}

export type CreateVendorDto = (
    VendorWithDisplayName |
    VendorWithSuffix |
    VendorWithTitle |
    VendorWithMiddleName |
    VendorWithFamilyName |
    VendorWithGivenName
) & VendorDto;

export type FullUpdateVendorDto = (
    VendorWithDisplayName |
    VendorWithSuffix |
    VendorWithTitle |
    VendorWithMiddleName |
    VendorWithFamilyName |
    VendorWithGivenName
) & VendorDto;

export type SparseUpdateVendorDto = (
    VendorWithDisplayName |
    VendorWithSuffix |
    VendorWithTitle |
    VendorWithMiddleName |
    VendorWithFamilyName |
    VendorWithGivenName
) & VendorDto;
