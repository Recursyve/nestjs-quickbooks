export enum QuickBooksScopes {
    Accounting = "com.intuit.quickbooks.accounting",
    Payment = "com.intuit.quickbooks.payment",
    Payroll = "com.intuit.quickbooks.payroll",
    TimeTracking = "com.intuit.quickbooks.payroll.timetracking",
    Benefits = "com.intuit.quickbooks.payroll.benefits",
    Profile = "profile",
    Email = "email",
    Phone = "phone",
    Address = "address",
    OpenId = "openid",
    IntuitName = "intuit_name"
}

export class QuickbooksConfigModel {
    public readonly clientId: string;
    public readonly clientSecret: string;
    public readonly scopes: QuickBooksScopes[];

    constructor(config: Partial<QuickbooksConfigModel>) {
        this.clientId = config.clientId ?? process.env.QUICKBOOKS_CLIENT_ID;
        this.clientSecret = config.clientSecret ?? process.env.QUICKBOOKS_CLIENT_SECRET;
        this.scopes = config.scopes ?? process.env.QUICKBOOKS_CLIENT_SCOPES.split(" ") as QuickBooksScopes[];
    }
}
