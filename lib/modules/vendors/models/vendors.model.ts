import {
    QuickBooksContactInfoModel,
    QuickBooksEmailModel,
    QuickBooksModel,
    QuickBooksPhoneNumberModel,
    QuickBooksPhysicalAddressModel,
    QuickBooksRefModel,
    QuickBooksWebsiteModel
} from "../../common/models";
import { TaxReportingBasesEnum } from "../../common/enums";

export interface QuickBooksVendorsPaymentBankDetailModel {
    BankAccountName: string;
    BankBranchIdentifier: string;
    BankAccountNumber: string;
    StatementText: string;
}

export interface QuickBooksVendors extends QuickBooksModel {
    Title: string;
    GivenName: string;
    MiddleName: string;
    Suffix: string;
    FamilyName: string;
    PrimaryEmailAddr: QuickBooksEmailModel;
    DisplayName: string;
    OtherContactInfo: QuickBooksContactInfoModel;
    APAccountRef: QuickBooksRefModel;
    TermRef: QuickBooksRefModel;
    GSTIN: string;
    Fax: QuickBooksPhoneNumberModel;
    BusinessNumber: string;
    CurrencyRef: QuickBooksRefModel;
    HasTPAR: boolean;
    TaxReportingBasis: TaxReportingBasesEnum;
    Mobile: QuickBooksPhoneNumberModel;
    PrimaryPhone: QuickBooksPhoneNumberModel;
    Active: boolean;
    AlternatePhone: QuickBooksPhoneNumberModel;
    Vendor1099: boolean;
    BillRate: number;
    WebAddr: QuickBooksWebsiteModel;
    CompanyName: string;
    VendorPaymentBankDetail: QuickBooksVendorsPaymentBankDetailModel;
    TaxIdentifier: string;
    AcctNum: string;
    GSTRegistrationType: string;
    PrintOnCheckName: string;
    BillAddr: QuickBooksPhysicalAddressModel;
    Balance: number;
}
