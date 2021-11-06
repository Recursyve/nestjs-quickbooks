import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { QuickBooksAuthModule } from "../auth/auth.module";
import { QuickBooksInvoicesService } from "./services/invoices.service";

@Module({
    imports: [QuickBooksAuthModule, HttpModule],
    providers: [QuickBooksInvoicesService],
    exports: [QuickBooksInvoicesService]
})
export class QuickBooksInvoicesModule {}
