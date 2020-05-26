import { HttpModule, Module } from "@nestjs/common";
import { QuickBooksAuthModule } from "../auth/auth.module";
import { QuickBooksItemsService } from "./services/items.service";

@Module({
    imports: [QuickBooksAuthModule, HttpModule],
    providers: [QuickBooksItemsService],
    exports: [QuickBooksItemsService]
})
export class QuickBooksItemsModule {}
