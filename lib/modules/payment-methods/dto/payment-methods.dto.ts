import { QuickBooksPaymentMethodsEnum } from "../../common/enums";

export interface QuickBooksPaymentMethodsDto {
    Name: string;
    Active: boolean;
    Type: QuickBooksPaymentMethodsEnum;
}

export type CreateQuickBooksPaymentMethodsDto = QuickBooksPaymentMethodsDto;

export type FullUpdateQuickBooksPaymentMethodsDto = QuickBooksPaymentMethodsDto;
