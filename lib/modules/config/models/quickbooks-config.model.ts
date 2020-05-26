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

export type QuickbooksModes = "production" | "sandbox";

export interface QuickbooksRedirectionModel {
    successUrl: string;
    errorUrl: string;
}

export interface QuickBooksConfigModel {
    clientId: string;
    clientSecret: string;
    scopes: QuickBooksScopes[];
    mode: QuickbooksModes;
    serverUri: string;
    redirection: QuickbooksRedirectionModel;
}

export class QuickBooksConfigModel {
    public clientId: string;
    public clientSecret: string;
    public scopes: QuickBooksScopes[];
    public mode: QuickbooksModes;
    public redirection: QuickbooksRedirectionModel;
    public serverUri: string;

    constructor(config: Partial<QuickBooksConfigModel>) {
        this.clientId = config.clientId ?? process.env.QUICKBOOKS_CLIENT_ID;
        this.clientSecret = config.clientSecret ?? process.env.QUICKBOOKS_CLIENT_SECRET;
        this.scopes = config.scopes ?? process.env.QUICKBOOKS_CLIENT_SCOPES.split(" ") as QuickBooksScopes[];
        this.mode = config.mode ?? process.env.QUICKBOOKS_MODE as QuickbooksModes;
        this.serverUri = config.serverUri ?? process.env.QUICKBOOKS_SERVER_URI;
        this.redirection = config.redirection ?? {
            successUrl: process.env.QUICKBOOKS_REDIRECT_SUCCESS,
            errorUrl: process.env.QUICKBOOKS_REDIRECT_ERROR
        };

        if (this.mode !== "sandbox" && this.mode !== "production") {
            this.mode = "sandbox";
        }
    }
}
