import { QuickBooksRefModel } from "./ref.model";

export interface QuickBooksMarkupInfoModel {
    PriceLevelRef: QuickBooksRefModel;
    Percent: number;
    MarkUpIncomeAccountRef: QuickBooksRefModel;
}
