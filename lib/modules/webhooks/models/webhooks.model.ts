export const quickbooksCloudEventEntities = [
    "account",
    "bill",
    "billpayment",
    "budget",
    "class",
    "creditmemo",
    "currency",
    "customer",
    "department",
    "deposit",
    "employee",
    "estimate",
    "invoice",
    "item",
    "journalcode",
    "journalentry",
    "payment",
    "paymentmethod",
    "preferences",
    "purchase",
    "purchaseorder",
    "refundreceipt",
    "salesreceipt",
    "taxagency",
    "term",
    "timeactivity",
    "transfer",
    "vendor",
    "vendorcredit"
] as const;
export type QuickbooksCloudEventEntity = (typeof quickbooksCloudEventEntities)[number];
export function isQuickbooksCloudEventEntity(value: unknown): value is QuickbooksCloudEventEntity {
    return quickbooksCloudEventEntities.includes(value as QuickbooksCloudEventEntity);
}

export const quickbooksCloudEventActions = ["created", "updated", "deleted", "merged", "voided", "emailed"] as const;
export type QuickbooksCloudEventAction = (typeof quickbooksCloudEventActions)[number];
export function isQuickbooksCloudEventAction(value: unknown): value is QuickbooksCloudEventAction {
    return quickbooksCloudEventActions.includes(value as QuickbooksCloudEventAction);
}

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
