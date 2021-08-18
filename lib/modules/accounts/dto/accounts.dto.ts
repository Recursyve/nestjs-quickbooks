import {QuickBooksAccountTypesEnum, QuickBooksModel, QuickBooksRefModel} from "../../common";

export interface QuickBooksAccountsDto  {
    AcctNum?: string;
    CurrencyRef?: QuickBooksRefModel;
    ParentRef?: QuickBooksRefModel;
    Description?: string;
    SubAccount?: boolean;
    Classification?: string;
    FullyQualifiedName?: string;
    TxnLocationType?: string;
}

export interface CreateQuickBooksAccountsDto extends QuickBooksAccountsDto {
    Name: string;
    AcctNum?: string;
    TaxCodeRef?: QuickBooksRefModel;
    AccountType?: QuickBooksAccountTypesEnum;
}
