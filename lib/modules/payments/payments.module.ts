import { HttpModule, Module } from "@nestjs/common";
import { QuickBooksAuthModule } from "../auth/auth.module";
import { QuickBooksPaymentsService } from "./services/payments.service";

@Module({
    imports: [QuickBooksAuthModule, HttpModule],
    providers: [QuickBooksPaymentsService],
    exports: [QuickBooksPaymentsService]
})
export class QuickBooksPaymentsModule {}
