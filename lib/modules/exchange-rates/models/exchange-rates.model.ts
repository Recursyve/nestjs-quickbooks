import { QuickBooksModel } from "../../common";

export interface QuickBooksExchangeRates extends QuickBooksModel {
    SyncToken: string;
    AsOfDate: Date;
    SourceCurrencyCode: string;
    TargetCurrencyCode: string;
    Rate: number;
}
