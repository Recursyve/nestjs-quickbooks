import { QuickbooksModel } from "../../common/models/quickbooks.model";
import { RefModel } from "../../common/models/ref.model";
import { DateTimeModel } from "../../common/models/date-time.model";

export interface CreditCardPayment {
    CreditChargeResponse: {
        Status: string;
        AuthCode: string;
        TxnAuthorizationTime: DateTimeModel;
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

export interface QuickBooksPayments extends QuickbooksModel {
    TotalAmt: number;
    CustomerRef: RefModel;
    CurrencyRef: RefModel;
    PrivateNote: string;
    PaymentMethodRef: RefModel;
    UnappliedAmt: number;
    DepositToAccountRef: RefModel;
    ExchangeRate: number;
    Line: QuickBooksPaymentLines[];
    TxnSource: string;
    ARAccountRef: RefModel;
    TxnDate: string;
    CreditCardPayment: CreditCardPayment;
    TransactionLocationType: string;
    PaymentRefNum: string;
    TaxExemptionRef: RefModel;
}
