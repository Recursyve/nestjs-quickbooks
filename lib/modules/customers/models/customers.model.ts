import {
    QuickBooksEmailModel,
    QuickBooksModel,
    QuickBooksPhoneNumberModel,
    QuickBooksPhysicalAddressModel
} from "../../common/models";

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
    BillAddr: QuickBooksPhysicalAddressModel;
    PreferredDeliveryMethod: string;
    Taxable: number;
    PrintOnCheckName: string;
    Balance: number;
}
