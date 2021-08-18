import {AccountTypesEnum, QuickBooksModel, QuickBooksRefModel} from "../../common";

export interface QuickBooksAccounts extends QuickBooksModel {
    Name: string;
    AcctNum?: string;
    CurrencyRef?: QuickBooksRefModel;
    ParentRef?: QuickBooksRefModel;
    Description?: string;
    Active: boolean;
    SubAccount?: boolean;
    Classification?: string;
    FullyQualifiedName?: string;
    TxnLocationType?: string;
    AccountType: AccountTypesEnum;
    CurrentBalanceWithSubAccounts: number;
    AccountAlias: string;
    TaxCodeRef: QuickBooksRefModel;
    AccountSubType: string;
    CurrentBalance: number;
}
