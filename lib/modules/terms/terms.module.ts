import { Module } from "@nestjs/common";
import { QuickBooksAuthModule } from "../auth/auth.module";
import { QuickBooksTermsService } from "./services/terms.service";
import { HttpModule } from "@nestjs/axios";

@Module({
    imports: [QuickBooksAuthModule, HttpModule],
    providers: [QuickBooksTermsService],
    exports: [QuickBooksTermsService]
})
export class QuickBooksTermsModule {}
