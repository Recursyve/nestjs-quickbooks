import { HttpModule, Module } from "@nestjs/common";
import { QuickBooksAuthModule } from "../auth/auth.module";
import { VendorsService } from "./services/vendors.service";

@Module({
    imports: [QuickBooksAuthModule, HttpModule],
    providers: [VendorsService],
    exports: [VendorsService]
})
export class QuickBooksVendorsModule {}
