import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { QuickBooksAuthModule } from "../auth/auth.module";
import { QuickBooksCustomersService } from "./services/customers.service";

@Module({
    imports: [QuickBooksAuthModule, HttpModule],
    providers: [QuickBooksCustomersService],
    exports: [QuickBooksCustomersService]
})
export class QuickBooksCustomersModule {}
