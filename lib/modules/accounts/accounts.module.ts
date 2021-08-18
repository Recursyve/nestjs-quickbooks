import { HttpModule, Module } from "@nestjs/common";
import { QuickBooksAuthModule } from "../auth/auth.module";
import {QuickBooksAccountsService} from "./services/accounts.service";

@Module({
    imports: [QuickBooksAuthModule, HttpModule],
    providers: [QuickBooksAccountsService],
    exports: [QuickBooksAccountsService]
})
export class QuickBooksAccountsModule {}
