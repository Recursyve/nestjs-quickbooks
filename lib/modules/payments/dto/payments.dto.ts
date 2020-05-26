import { DateTimeModel } from "../../common/models/date-time.model";
import { RefDto } from "../../common/dto/ref.dto";

export interface CreditCardPaymentDto {
    CreditChargeResponse?: {
        Status?: string;
        AuthCode?: string;
        TxnAuthorizationTime?: DateTimeModel;
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

export interface PaymentLinkedTxnDto {
    TxnId: string;
    TxnType: "Expense" | "Check" | "CreditCardCredit" | "JournalEntry" | "CreditMemo" | "Invoice";
    TxnLineId?: string;
}

export interface PaymentLinesDto {
    Amount: number;
    LinkedTxn: PaymentLinkedTxnDto[];
}

export interface CreatePaymentsDto {
    TotalAmt: number;
    CustomerRef: RefDto;
    CurrencyRef?: RefDto;
    PrivateNote?: string;
    PaymentMethodRef?: RefDto;
    DepositToAccountRef?: RefDto;
    ExchangeRate?: number;
    Line?: PaymentLinesDto[];
    TxnSource?: string;
    ARAccountRef?: RefDto;
    TxnDate?: string;
    CreditCardPayment?: CreditCardPaymentDto;
    TransactionLocationType?: string;
    PaymentRefNum?: string;
}

export interface FullUpdatePaymentsDto {
    TotalAmt: number;
    CustomerRef: RefDto;
    CurrencyRef?: RefDto;
    PrivateNote?: string;
    PaymentMethodRef?: RefDto;
    DepositToAccountRef?: RefDto;
    ExchangeRate?: number;
    Line?: PaymentLinesDto[];
    TxnSource?: string;
    ARAccountRef?: RefDto;
    TxnDate?: string;
    CreditCardPayment?: CreditCardPaymentDto;
    TransactionLocationType?: string;
    PaymentRefNum?: string;
}
