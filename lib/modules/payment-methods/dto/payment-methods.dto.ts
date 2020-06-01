import { PaymentMethodsEnum } from "../../common/enums";

export interface QuickBooksPaymentMethodsDto {
    Name: string;
    Active: boolean;
    Type: PaymentMethodsEnum;
}

export type CreateQuickBooksPaymentMethodsDto = QuickBooksPaymentMethodsDto;

export type FullUpdateQuickBooksPaymentMethodsDto = QuickBooksPaymentMethodsDto;
