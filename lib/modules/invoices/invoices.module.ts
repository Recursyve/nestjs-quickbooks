import { HttpModule, Module } from "@nestjs/common";
import { QuickBooksAuthModule } from "../auth/auth.module";
import { InvoicesService } from "./services/invoices.service";

@Module({
    imports: [QuickBooksAuthModule, HttpModule],
    providers: [InvoicesService],
    exports: [InvoicesService]
})
export class QuickBooksInvoicesModule {}
