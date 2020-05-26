import { QuickBooksModel } from "../../common/models/quickbooks.model";
import { QuickBooksEmailModel } from "../../common/models/email.model";
import { QuickBooksPhoneNumberModel } from "../../common/models/phone-number.model";

export interface QuickBooksCustomersAddress {
    Id: string;
    City: string;
    Line1: string;
    PostalCode: string;
    Lat: string;
    Long: string;
    CountrySubDivisionCode: string;
}

export interface QuickBooksCustomers extends QuickBooksModel {
    PrimaryEmailAddr: QuickBooksEmailModel;
    GivenName: string;
    DisplayName: string;
    BillWithParent: boolean;
    FullyQualifiedName: string;
    CompanyName: string;
    FamilyName: string;
    PrimaryPhone: QuickBooksPhoneNumberModel;
    Active: boolean;
    Job: boolean;
    BalanceWithJobs: number;
    BillAddr: QuickBooksCustomersAddress;
    PreferredDeliveryMethod: string;
    Taxable: number;
    PrintOnCheckName: string;
    Balance: number;
}
