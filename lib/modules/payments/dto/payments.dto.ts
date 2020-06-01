import { QuickBooksDateTimeModel } from "../../common/models";
import { QuickBooksRefDto } from "../../common/dto";

export interface QuickBooksCreditCardPaymentDto {
    CreditChargeResponse?: {
        Status?: string;
        AuthCode?: string;
        TxnAuthorizationTime?: QuickBooksDateTimeModel;
        CCTransId?: string;
    };
    CreditChargeInfo?: {
        CcExpiryMonth?: number;
        ProcessPayment?: boolean;
        PostalCode?: string;
        Amount?: number;
        NameOnAcct?: string;
        CcExpiryYear?: number;
        Type?: string;
        BillAddrStreet?: string;
    };
}

export interface QuickBooksPaymentLinkedTxnDto {
    TxnId: string;
    TxnType: "Expense" | "Check" | "CreditCardCredit" | "JournalEntry" | "CreditMemo" | "Invoice";
    TxnLineId?: string;
}

export interface QuickBooksPaymentLinesDto {
    Amount: number;
    LinkedTxn: QuickBooksPaymentLinkedTxnDto[];
}

export interface CreateQuickBooksPaymentsDto {
    TotalAmt: number;
    CustomerRef: QuickBooksRefDto;
    CurrencyRef?: QuickBooksRefDto;
    PrivateNote?: string;
    PaymentMethodRef?: QuickBooksRefDto;
    DepositToAccountRef?: QuickBooksRefDto;
    ExchangeRate?: number;
    Line?: QuickBooksPaymentLinesDto[];
    TxnSource?: string;
    ARAccountRef?: QuickBooksRefDto;
    TxnDate?: string;
    CreditCardPayment?: QuickBooksCreditCardPaymentDto;
    TransactionLocationType?: string;
    PaymentRefNum?: string;
}

export interface FullUpdateQuickBooksPaymentsDto {
    TotalAmt: number;
    CustomerRef: QuickBooksRefDto;
    CurrencyRef?: QuickBooksRefDto;
    PrivateNote?: string;
    PaymentMethodRef?: QuickBooksRefDto;
    DepositToAccountRef?: QuickBooksRefDto;
    ExchangeRate?: number;
    Line?: QuickBooksPaymentLinesDto[];
    TxnSource?: string;
    ARAccountRef?: QuickBooksRefDto;
    TxnDate?: string;
    CreditCardPayment?: QuickBooksCreditCardPaymentDto;
    TransactionLocationType?: string;
    PaymentRefNum?: string;
}
