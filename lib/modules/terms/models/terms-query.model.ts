import { QuickBooksQueryModel } from "../../common";

export interface QuickBooksTermsQuery extends QuickBooksQueryModel {
    Name: string;
    Active: boolean;
}
