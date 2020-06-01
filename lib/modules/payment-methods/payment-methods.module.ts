import { HttpModule, Module } from "@nestjs/common";
import { QuickBooksAuthModule } from "../auth/auth.module";
import { QuickBooksPaymentMethodsService } from "./services/payment-methods.service";

@Module({
    imports: [QuickBooksAuthModule, HttpModule],
    providers: [QuickBooksPaymentMethodsService],
    exports: [QuickBooksPaymentMethodsService]
})
export class QuickBooksPaymentMethodsModule {}
