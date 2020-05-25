import { Module } from "@nestjs/common";
import { QuickbooksModule } from "../../lib";
import { QuickBooksScopes } from "../../lib/modules/config/models/quickbooks-config.model";
import { QuickBooksCustomersModule } from "../../lib/modules/customers/customers.module";
import { CustomersController } from "./customers/customers.controller";

@Module({
    imports: [
        QuickbooksModule.forRoot({
            scopes: [QuickBooksScopes.Accounting]
        }),
        QuickBooksCustomersModule
    ],
    controllers: [CustomersController]
})
export class AppModule {}
