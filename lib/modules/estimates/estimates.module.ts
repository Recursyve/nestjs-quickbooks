import { HttpModule, Module } from "@nestjs/common";
import { QuickBooksAuthModule } from "../auth/auth.module";
import { QuickBooksEstimatesService } from "./services/estimates.service";

@Module({
    imports: [QuickBooksAuthModule, HttpModule],
    providers: [QuickBooksEstimatesService],
    exports: [QuickBooksEstimatesService]
})
export class QuickBooksEstimatesModule {
}
