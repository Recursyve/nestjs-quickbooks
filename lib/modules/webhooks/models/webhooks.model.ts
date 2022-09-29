export type QuickbooksWebhookEntities =
    | "Account"
    | "BillPayment"
    | "Class"
    | "Customer"
    | "Employee"
    | "Estimate"
    | "Invoice"
    | "Item"
    | "Payment"
    | "Purchase"
    | "SalesReceipt"
    | "Vendor"
    | "Bill"
    | "CreditMemo"
    | "RefundReceipt"
    | "VendorCredit"
    | "TimeActivity"
    | "Department"
    | "Deposit"
    | "JournalEntry"
    | "PaymentMethod"
    | "Preferences"
    | "PurchaseOrder"
    | "TaxAgency"
    | "Term"
    | "Transfer"
    | "Budget"
    | "Currency"
    | "JournalCode";

export type QuickbooksWebhookOperations =
    | "Create"
    | "Update"
    | "Delete"
    | "Merge"
    | "Void"
    | "Emailed";

export interface QuickbooksWebhookEntitiesModel {
    id: string;
    name: QuickbooksWebhookEntities;
    operation: QuickbooksWebhookOperations;
    lastUpdated: string;
}

export interface QuickbooksDataChangeEventModel {
    entities: QuickbooksWebhookEntitiesModel[];
}

export interface QuickbooksEventNotificationsModel {
    realmId: string;
    dataChangeEvent: QuickbooksDataChangeEventModel;
}

export interface QuickbooksWebhookEventModel {
    eventNotifications: QuickbooksEventNotificationsModel[];
}
