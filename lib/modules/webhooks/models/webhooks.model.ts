export type QuickbooksCloudEventEntity =
    | "account"
    | "bill"
    | "billpayment"
    | "budget"
    | "class"
    | "creditmemo"
    | "currency"
    | "customer"
    | "department"
    | "deposit"
    | "employee"
    | "estimate"
    | "invoice"
    | "item"
    | "journalcode"
    | "journalentry"
    | "payment"
    | "paymentmethod"
    | "preferences"
    | "purchase"
    | "purchaseorder"
    | "refundreceipt"
    | "salesreceipt"
    | "taxagency"
    | "term"
    | "timeactivity"
    | "transfer"
    | "vendor"
    | "vendorcredit";

export type QuickbooksCloudEventAction =
    | "created"
    | "updated"
    | "deleted"
    | "merged"
    | "voided"
    | "emailed";

export type QuickbooksCloudEventType =
    | `qbo.${QuickbooksCloudEventEntity}.${QuickbooksCloudEventAction}.v1`
    | (string & {});

export interface QuickbooksCloudEvent<T = unknown> {
    specversion: string;
    id: string;
    source: string;
    type: QuickbooksCloudEventType;
    datacontenttype: string;
    time: string;
    intuitentityid: string;
    intuitaccountid: string;
    data: T;
}

export type QuickbooksWebhookPayload = QuickbooksCloudEvent[];
