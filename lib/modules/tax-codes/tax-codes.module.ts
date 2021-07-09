import { HttpModule, Module } from "@nestjs/common";
import { QuickBooksAuthModule } from "../auth/auth.module";
import { QuickBooksTaxCodesService } from "./services/tax-codes.service";

@Module({
    imports: [QuickBooksAuthModule, HttpModule],
    providers: [QuickBooksTaxCodesService],
    exports: [QuickBooksTaxCodesService]
})
export class QuickBooksTaxCodesModule {
}
