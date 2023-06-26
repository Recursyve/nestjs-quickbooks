import { QuickBooksModel } from "../../common";

export interface QuickBooksTerms extends QuickBooksModel {
    Name: string;
    Active: boolean;
    DueDays: number;
    DueNextMonthDays: number;
    DayOfMonthDue: number;
    DiscountDayOfMonth: number;
    DiscountPercent: number;
    DiscountDays: number;
}
