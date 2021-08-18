import { HttpModule, Module } from "@nestjs/common";
import { QuickBooksAuthModule } from "../auth/auth.module";
import { QuickBooksEmployeesService } from "./services/employees.service";

@Module({
    imports: [QuickBooksAuthModule, HttpModule],
    providers: [QuickBooksEmployeesService],
    exports: [QuickBooksEmployeesService]
})
export class QuickBooksEmployeesModule {}
