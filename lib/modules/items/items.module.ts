import { HttpModule, Module } from "@nestjs/common";
import { QuickBooksAuthModule } from "../auth/auth.module";
import { ItemsService } from "./services/items.service";

@Module({
    imports: [QuickBooksAuthModule, HttpModule],
    providers: [ItemsService],
    exports: [ItemsService]
})
export class QuickBooksItemsModule {}
