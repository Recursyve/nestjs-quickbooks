import { QuickBooksCurrencyRefValuesEnum } from "../enums/currency-ref-values.enum";

export interface QuickBooksCurrencyRefDto {
    value: QuickBooksCurrencyRefValuesEnum;
    name?: string;
}
