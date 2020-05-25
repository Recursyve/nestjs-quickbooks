import { HttpModule, Module } from "@nestjs/common";
import { QuickBooksAuthModule } from "../auth/auth.module";
import { CustomersService } from "./services/customers.service";

@Module({
    imports: [QuickBooksAuthModule, HttpModule],
    providers: [CustomersService],
    exports: [CustomersService]
})
export class QuickBooksCustomersModule {}
