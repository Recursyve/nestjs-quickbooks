import { Module } from "@nestjs/common";
import { QuickbooksModule } from "../../lib";
import { QuickBooksScopes } from "../../lib/modules/config/models/quickbooks-config.model";
import { QuickBooksCustomersModule } from "../../lib/modules/customers/customers.module";
import { QuickBooksInvoicesModule } from "../../lib/modules/invoices/invoices.module";
import { CustomersController } from "./customers/customers.controller";
import { InvoicesController } from "./invoices/invoices.controller";

@Module({
    imports: [
        QuickbooksModule.forRoot({
            scopes: [QuickBooksScopes.Accounting]
        }),
        QuickBooksCustomersModule,
        QuickBooksInvoicesModule
    ],
    controllers: [CustomersController, InvoicesController]
})
export class AppModule {}
