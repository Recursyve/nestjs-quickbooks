import { QuickBooksQueryModel } from "../../common";

export interface QuickBooksExchangeRatesQuery extends QuickBooksQueryModel {
    SourceCurrencyCode: string;
    TargetCurrencyCode: string;
    AsOfDate: string;
}
