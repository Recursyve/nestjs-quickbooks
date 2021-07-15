import { QuickBooksQueryModel } from "../../common";

export interface QuickBooksTaxCodesQuery extends QuickBooksQueryModel {
    Name: string;
    Active: boolean;
    Description: string;
}
