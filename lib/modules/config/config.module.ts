import { Module } from "@nestjs/common";
import { QuickBooksConfigService } from "./services/quickbooks-config.service";

@Module({
    providers: [QuickBooksConfigService],
    exports: [QuickBooksConfigService]
})
export class ConfigModule {}
