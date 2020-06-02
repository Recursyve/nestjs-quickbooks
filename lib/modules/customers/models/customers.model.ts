import {
    QuickBooksDateModel,
    QuickBooksEmailModel,
    QuickBooksModel,
    QuickBooksPhoneNumberModel,
    QuickBooksPhysicalAddressModel,
    QuickBooksRefModel,
    QuickBooksWebsiteModel
} from "../../common/models";
import { QuickBooksDeliveryMethodsEnum, QuickBooksTaxExemptionReasonsEnum } from "../../common/enums";

export interface QuickBooksCustomers extends QuickBooksModel {
    DisplayName: string;
    Title: string;
    GivenName: string;
    MiddleName: string;
    Suffix: string;
    FamilyName: string;
    PrimaryEmailAddr: QuickBooksEmailModel;
    ResaleNum: string;
    SecondaryTaxIdentifier: string;
    ARAccountRef: QuickBooksRefModel;
    DefaultTaxCodeRef: QuickBooksRefModel;
    PreferredDeliveryMethod: QuickBooksDeliveryMethodsEnum;
    GSTIN: string;
    SalesTermRef: QuickBooksRefModel;
    CustomerTypeRef: string;
    Fax: QuickBooksPhoneNumberModel;
    BusinessNumber: string;
    BillWithParent: boolean;
    CurrencyRef: QuickBooksRefModel;
    Mobile: QuickBooksPhoneNumberModel;
    Job: boolean;
    BalanceWithJobs: number;
    PrimaryPhone: QuickBooksPhoneNumberModel;
    OpenBalanceDate: QuickBooksDateModel;
    Taxable: number;
    AlternatePhone: QuickBooksPhoneNumberModel;
    ParentRef: QuickBooksRefModel;
    Notes: string;
    WebAddr: QuickBooksWebsiteModel;
    Active: boolean;
    Balance: number;
    ShipAddr: QuickBooksPhysicalAddressModel;
    PaymentMethodRef: QuickBooksRefModel;
    IsProject: boolean;
    CompanyName: string;
    PrimaryTaxIdentifier: string;
    GTSRegistrationType: string;
    PrintOnCheckName: string;
    BillAddr: QuickBooksPhysicalAddressModel;
    FullyQualifiedName: string;
    Level: number;
    TaxExemptionReasonId: QuickBooksTaxExemptionReasonsEnum;
}
