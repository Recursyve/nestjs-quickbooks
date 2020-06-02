import { HttpModule, Module } from "@nestjs/common";
import { QuickBooksAuthModule } from "../auth/auth.module";
import { QuickBooksBillsService } from "./services/bills.service";

@Module({
    imports: [QuickBooksAuthModule, HttpModule],
    providers: [QuickBooksBillsService],
    exports: [QuickBooksBillsService]
})
export class QuickBooksBillsModule {}
