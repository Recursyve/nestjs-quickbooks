import { QuickbooksModel } from "../../common/models/quickbooks.model";
import { RefModel } from "../../common/models/ref.model";
import { PhoneNumberModel } from "../../common/models/phone-number.model";
import { EmailModel } from "../../common/models/email.model";
import { WebsiteModel } from "../../common/models/website.model";

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

export interface QuickBooksVendors extends QuickbooksModel {
    Title: string;
    GivenName: string;
    MiddleName: string;
    Suffix: string;
    FamilyName: string;
    PrimaryEmailAddr: EmailModel;
    DisplayName: string;
    OtherContactInfo: QuickBooksVendorsContactInfo;
    APAccountRef: RefModel;
    TermRef: RefModel;
    GSTIN: string;
    Fax: PhoneNumberModel;
    BusinessNumber: string;
    CurrencyRef: RefModel;
    HasTPAR: boolean;
    TaxReportingBasis: "Cash" | "Accrual";
    Mobile: PhoneNumberModel;
    PrimaryPhone: PhoneNumberModel;
    Active: boolean;
    AlternatePhone: PhoneNumberModel;
    Vendor1099: boolean;
    BillRate: number;
    WebAddr: WebsiteModel;
    CompanyName: string;
    TaxIdentifier: string;
    AcctNum: string;
    GSTRegistrationType: string;
    PrintOnCheckName: string;
    BillAddr: QuickBooksVendorsAddress;
    Balance: number;
}
