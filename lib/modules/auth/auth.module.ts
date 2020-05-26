import { HttpModule, Module } from "@nestjs/common";
import { QuickBooksAuthService } from "./services/auth.service";
import { ConfigModule } from "../config/config.module";
import { QuickBooksAuthController } from "./controllers/auth.controller";

@Module({
    imports: [ConfigModule, HttpModule],
    controllers: [QuickBooksAuthController],
    providers: [QuickBooksAuthService],
    exports: [QuickBooksAuthService]
})
export class QuickBooksAuthModule {}
