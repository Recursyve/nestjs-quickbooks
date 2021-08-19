import { QuickBooksAccountTypesEnum, QuickBooksQueryModel, QuickBooksRefModel } from "../../common";

export interface QuickBooksAccountsQueryModel extends QuickBooksQueryModel {
    Name: string;
    ParentRef: QuickBooksRefModel;
    Description: string;
    Active: boolean;
    SubAccount: boolean;
    Classification: string;
    FullyQualifiedName: string;
    AccountType: QuickBooksAccountTypesEnum;
    CurrentBalanceWithSubAccounts: number;
    AccountSubType: string;
    CurrentBalance: string;
}
