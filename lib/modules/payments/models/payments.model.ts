import { QuickBooksModel } from "../../common/models/quickbooks.model";
import { QuickBooksRefModel } from "../../common/models/ref.model";
import { QuickBooksDateTimeModel } from "../../common/models/date-time.model";

export interface QuickBooksCreditCardPayment {
    CreditChargeResponse: {
        Status: string;
        AuthCode: string;
        TxnAuthorizationTime: QuickBooksDateTimeModel;
        CCTransId: string;
    };
    CreditChargeInfo: {
        CcExpiryMonth: number;
        ProcessPayment: boolean;
        PostalCode: string;
        Amount: number;
        NameOnAcct: string;
        CcExpiryYear: number;
        Type: string;
        BillAddrStreet: string;
    };
}

export interface QuickBooksPaymentLinkedTxn {
    TxnId: string;
    TxnType: "Expense" | "Check" | "CreditCardCredit" | "JournalEntry" | "CreditMemo" | "Invoice";
    TxnLineId: string;
}

export interface QuickBooksPaymentLines {
    Amount: number;
    LinkedTxn: QuickBooksPaymentLinkedTxn[];
}

export interface QuickBooksPayments extends QuickBooksModel {
    TotalAmt: number;
    CustomerRef: QuickBooksRefModel;
    CurrencyRef: QuickBooksRefModel;
    PrivateNote: string;
    PaymentMethodRef: QuickBooksRefModel;
    UnappliedAmt: number;
    DepositToAccountRef: QuickBooksRefModel;
    ExchangeRate: number;
    Line: QuickBooksPaymentLines[];
    TxnSource: string;
    ARAccountRef: QuickBooksRefModel;
    TxnDate: string;
    CreditCardPayment: QuickBooksCreditCardPayment;
    TransactionLocationType: string;
    PaymentRefNum: string;
    TaxExemptionRef: QuickBooksRefModel;
}
