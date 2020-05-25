import { HttpModule, Module } from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import { ConfigModule } from "../config/config.module";
import { QuickbooksAuthController } from "./controllers/auth.controller";

@Module({
    imports: [ConfigModule, HttpModule],
    controllers: [QuickbooksAuthController],
    providers: [AuthService],
    exports: [AuthService]
})
export class QuickBooksAuthModule {}
