import { QuickbooksModel } from "../../common/models/quickbooks.model";

export interface QuickBooksCustomersEmail {
    Address: string;
}

export interface QuickBooksCustomersPhone {
    FreeFormNumber: string;
}

export interface QuickBooksCustomersAddress {
    City: string;
    Line1: string;
    PostalCode: string;
    Lat: string;
    Long: string;
    CountrySubDivisionCode: string;
    Id: string;
}

export interface QuickBooksCustomers extends QuickbooksModel {
    PrimaryEmailAddr: QuickBooksCustomersEmail;
    SyncToken: string;
    domain: string;
    GivenName: string;
    DisplayName: string;
    BillWithParent: boolean;
    FullyQualifiedName: string;
    CompanyName: string;
    FamilyName: string;
    sparse: boolean;
    PrimaryPhone: QuickBooksCustomersPhone;
    Active: boolean;
    Job: boolean;
    BalanceWithJobs: number;
    BillAddr: QuickBooksCustomersAddress;
    PreferredDeliveryMethod: string;
    Taxable: number;
    PrintOnCheckName: string;
    Balance: number;
}
