import { HttpModule, Module } from "@nestjs/common";
import { QuickBooksAuthModule } from "../auth/auth.module";
import { PaymentsService } from "./services/payments.service";

@Module({
    imports: [QuickBooksAuthModule, HttpModule],
    providers: [PaymentsService],
    exports: [PaymentsService]
})
export class QuickBooksPaymentsModule {}
