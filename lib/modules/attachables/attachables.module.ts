import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { QuickBooksAuthModule } from "../auth/auth.module";
import {QuickBooksAttachablesService} from "./services/attachables.service";

@Module({
    imports: [QuickBooksAuthModule, HttpModule],
    providers: [QuickBooksAttachablesService],
    exports: [QuickBooksAttachablesService]
})
export class QuickBooksAttachablesModule {}
