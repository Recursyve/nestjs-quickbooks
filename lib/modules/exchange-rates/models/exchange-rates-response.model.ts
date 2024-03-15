import { QuickBooksExchangeRates } from "./exchange-rates.model";
import { QuickBooksQueryResponseModel, QuickBooksResponseModel } from "../../common";

export interface QuickBooksExchangeRatesResponseModel extends QuickBooksResponseModel {
    ExchangeRate: QuickBooksExchangeRates;
}

export interface QuickBooksExchangeRatesQueryResponseModel extends QuickBooksResponseModel {
    QueryResponse: QuickBooksQueryResponseModel & { ExchangeRate: QuickBooksExchangeRates[]; };
}
