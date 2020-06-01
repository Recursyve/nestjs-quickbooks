import { QuickBooksModel } from "../../common/models";
import { PaymentMethodsEnum } from "../../common/enums";

export interface QuickBooksPaymentMethods extends QuickBooksModel {
    Name: string;
    Active: boolean;
    Type: PaymentMethodsEnum;
}
