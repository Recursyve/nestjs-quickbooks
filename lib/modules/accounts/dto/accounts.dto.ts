import {QuickBooksAccountTypesEnum, QuickBooksRefModel} from "../../common";

export interface QuickBooksAccountsDto  {
    AcctNum?: string;
    CurrencyRef?: QuickBooksRefModel;
    ParentRef?: QuickBooksRefModel;
    Description?: string;
    SubAccount?: boolean;
    Classification?: string;
    FullyQualifiedName?: string;
    TxnLocationType?: string;
    TaxCodeRef?: QuickBooksRefModel;
    AccountType?: QuickBooksAccountTypesEnum;
    Active?: boolean;
}

export interface CreateQuickBooksAccountsDto extends QuickBooksAccountsDto {
    Name: string;
}

export interface FullUpdateQuickBooksAccountsDto extends QuickBooksAccountsDto {
    Name: string;
}

export interface SparseUpdateQuickBooksAccountsDto extends QuickBooksAccountsDto {
    Name: string;
}
