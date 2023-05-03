import { Module } from "@nestjs/common";
import { RedisModule } from "@recursyve/nestjs-redis";
import {
    QuickBooksAttachablesModule,
    QuickBooksCustomersModule,
    QuickBooksEstimatesModule,
    QuickBooksInvoicesModule,
    QuickBooksModule,
    QuickBooksPaymentsModule,
    QuickBooksScopes,
    QuickBooksStore
} from "../../lib";
import { CustomersController } from "./customers/customers.controller";
import { InvoicesController } from "./invoices/invoices.controller";
import { RedisQuickbooksStore } from "./store/redis.quickbooks.store";

@Module({
    imports: [
        QuickBooksModule.forRoot({
            imports: [RedisModule],
            config: {
                mode: "sandbox",
                serverUri: "https://06dc-72-10-138-232.ngrok.io",
                scopes: [QuickBooksScopes.Accounting],
                redirection: {
                    successUrl: "http://localhost:3000/customer",
                    errorUrl: "http://localhost:3000/customer"
                }
            },
            store: {
                provide: QuickBooksStore,
                useClass: RedisQuickbooksStore
            }
        }),
        QuickBooksAttachablesModule,
        QuickBooksCustomersModule,
        QuickBooksEstimatesModule,
        QuickBooksInvoicesModule,
        QuickBooksPaymentsModule
    ],
    controllers: [CustomersController, InvoicesController]
})
export class AppModule {}
