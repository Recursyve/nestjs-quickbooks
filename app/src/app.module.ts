import { Module } from "@nestjs/common";
import {
    QuickBooksAttachablesModule,
    QuickBooksCustomersModule,
    QuickBooksInvoicesModule,
    QuickBooksModule,
    QuickBooksScopes
} from "../../lib";
import { CustomersController } from "./customers/customers.controller";
import { InvoicesController } from "./invoices/invoices.controller";

@Module({
    imports: [
        QuickBooksModule.forRoot({
            config: {
                mode: "sandbox",
                serverUri: "https://885b-72-10-138-232.ngrok.io",
                scopes: [QuickBooksScopes.Accounting],
                redirection: {
                    successUrl: "http://localhost:3000/customer",
                    errorUrl: "http://localhost:3000/customer"
                }
            }
        }),
        QuickBooksAttachablesModule,
        QuickBooksCustomersModule,
        QuickBooksInvoicesModule
    ],
    controllers: [CustomersController, InvoicesController]
})
export class AppModule {}
