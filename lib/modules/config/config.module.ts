import { Module } from "@nestjs/common";
import { QuickbooksConfigService } from "./services/quickbooks-config.service";

@Module({
    providers: [QuickbooksConfigService],
    exports: [QuickbooksConfigService]
})
export class ConfigModule {}
