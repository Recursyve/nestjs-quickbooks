import {
    QuickBooksDateDto,
    QuickBooksEmailDto,
    QuickBooksPhoneNumberDto,
    QuickBooksPhysicalAddressDto,
    QuickBooksRefDto,
    QuickBooksWebsiteDto
} from "../../common/dto";
import { QuickBooksDeliveryMethodsEnum, QuickBooksTaxExemptionReasonsEnum } from "../../common/enums";

export interface QuickBooksCustomerWithDisplayName {
    DisplayName: string;
    Title?: string;
    GivenName?: string;
    MiddleName?: string;
    Suffix?: string;
    FamilyName?: string;
}

export interface QuickBooksCustomerWithSuffix {
    DisplayName?: string;
    Title?: string;
    GivenName?: string;
    MiddleName?: string;
    Suffix: string;
    FamilyName?: string;
}

export interface QuickBooksCustomerWithTitle {
    DisplayName?: string;
    Title: string;
    GivenName?: string;
    MiddleName?: string;
    Suffix?: string;
    FamilyName?: string;
}

export interface QuickBooksCustomerWithMiddleName {
    DisplayName?: string;
    Title?: string;
    GivenName?: string;
    MiddleName: string;
    Suffix?: string;
    FamilyName?: string;
}

export interface QuickBooksCustomerWithFamilyName {
    DisplayName?: string;
    Title?: string;
    GivenName?: string;
    MiddleName?: string;
    Suffix?: string;
    FamilyName: string;
}

export interface QuickBooksCustomerWithGivenName {
    DisplayName?: string;
    Title?: string;
    GivenName: string;
    MiddleName?: string;
    Suffix?: string;
    FamilyName?: string;
}

export interface QuickBooksCustomersDto {
    PrimaryEmailAddr?: QuickBooksEmailDto;
    ResaleNum?: string;
    SecondaryTaxIdentifier?: string;
    ARAccountRef?: QuickBooksRefDto;
    DefaultTaxCodeRef?: QuickBooksRefDto;
    PreferredDeliveryMethod?: QuickBooksDeliveryMethodsEnum;
    GSTIN?: string;
    SalesTermRef?: QuickBooksRefDto;
    CustomerTypeRef?: string;
    Fax?: QuickBooksPhoneNumberDto;
    BusinessNumber?: string;
    BillWithParent?: boolean;
    CurrencyRef?: QuickBooksRefDto;
    Mobile?: QuickBooksPhoneNumberDto;
    Job?: boolean;
    BalanceWithJobs?: number;
    PrimaryPhone?: QuickBooksPhoneNumberDto;
    OpenBalanceDate?: QuickBooksDateDto;
    Taxable?: number;
    AlternatePhone?: QuickBooksPhoneNumberDto;
    ParentRef?: QuickBooksRefDto;
    Notes?: string;
    WebAddr?: QuickBooksWebsiteDto;
    Active?: boolean;
    Balance?: number;
    ShipAddr?: QuickBooksPhysicalAddressDto;
    PaymentMethodRef?: QuickBooksRefDto;
    IsProject?: boolean;
    CompanyName?: string;
    PrimaryTaxIdentifier?: string;
    GTSRegistrationType?: string;
    PrintOnCheckName?: string;
    BillAddr?: QuickBooksPhysicalAddressDto;
    FullyQualifiedName?: string;
    Level?: number;
    TaxExemptionReasonId?: QuickBooksTaxExemptionReasonsEnum;
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
