import { QuickBooksModel } from "../../common/models/quickbooks.model";
import { QuickBooksRefModel } from "../../common/models/ref.model";
import { QuickBooksPhoneNumberModel } from "../../common/models/phone-number.model";
import { QuickBooksEmailModel } from "../../common/models/email.model";
import { QuickBooksWebsiteModel } from "../../common/models/website.model";

export interface QuickBooksVendorsContactInfo {
    Type: "TelephoneNumber";
    Telephone: string;
}

export interface QuickBooksVendorsAddress {
    Id: string;
    City: string;
    Line1: string;
    PostalCode: string;
    Lat: string;
    Long: string;
    CountrySubDivisionCode: string;
}

export interface QuickBooksVendors extends QuickBooksModel {
    Title: string;
    GivenName: string;
    MiddleName: string;
    Suffix: string;
    FamilyName: string;
    PrimaryEmailAddr: QuickBooksEmailModel;
    DisplayName: string;
    OtherContactInfo: QuickBooksVendorsContactInfo;
    APAccountRef: QuickBooksRefModel;
    TermRef: QuickBooksRefModel;
    GSTIN: string;
    Fax: QuickBooksPhoneNumberModel;
    BusinessNumber: string;
    CurrencyRef: QuickBooksRefModel;
    HasTPAR: boolean;
    TaxReportingBasis: "Cash" | "Accrual";
    Mobile: QuickBooksPhoneNumberModel;
    PrimaryPhone: QuickBooksPhoneNumberModel;
    Active: boolean;
    AlternatePhone: QuickBooksPhoneNumberModel;
    Vendor1099: boolean;
    BillRate: number;
    WebAddr: QuickBooksWebsiteModel;
    CompanyName: string;
    TaxIdentifier: string;
    AcctNum: string;
    GSTRegistrationType: string;
    PrintOnCheckName: string;
    BillAddr: QuickBooksVendorsAddress;
    Balance: number;
}
