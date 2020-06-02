import { QuickBooksModel } from "../../common/models";
import { QuickBooksPaymentMethodsEnum } from "../../common/enums";

export interface QuickBooksPaymentMethods extends QuickBooksModel {
    Name: string;
    Active: boolean;
    Type: QuickBooksPaymentMethodsEnum;
}
