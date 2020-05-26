import { Module } from "@nestjs/common";
import { QuickBooksCustomersModule, QuickBooksInvoicesModule, QuickBooksModule, QuickBooksScopes } from "../../lib";
import { CustomersController } from "./customers/customers.controller";
import { InvoicesController } from "./invoices/invoices.controller";

@Module({
    imports: [
        QuickBooksModule.forRoot({
            config: {
                mode: "sandbox",
                serverUri: "http://localhost:3000",
                scopes: [QuickBooksScopes.Accounting],
                redirection: {
                    successUrl: "http://localhost:3000/customer",
                    errorUrl: "http://localhost:3000/customer"
                }
            }
        }),
        QuickBooksCustomersModule,
        QuickBooksInvoicesModule
    ],
    controllers: [CustomersController, InvoicesController]
})
export class AppModule {}
