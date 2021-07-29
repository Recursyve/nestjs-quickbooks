import { QuickBooksQueryModel } from "../../common";

export interface QuickBooksEstimatesQuery extends QuickBooksQueryModel {
    Name: string;
    Active: boolean;
    Description: string;
}
