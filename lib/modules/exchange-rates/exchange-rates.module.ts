import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { QuickBooksAuthModule } from "../auth/auth.module";
import { QuickBooksExchangeRatesService } from "./services/exchange-rates.service";

@Module({
    imports: [QuickBooksAuthModule, HttpModule],
    providers: [QuickBooksExchangeRatesService],
    exports: [QuickBooksExchangeRatesService]
})
export class QuickBooksExchangeRatesModule {
}
