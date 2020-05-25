import { DynamicModule, Global, Module } from "@nestjs/common";
import { QuickbooksConfigModel } from "./modules/config/models/quickbooks-config.model";
import { GLOBAL_CONFIG } from "./constants";
import { QuickBooksAuthModule } from "./modules/auth/auth.module";
import { Store } from "./modules/store/store";
import { LocalStore } from "./modules/store/local.store";

@Global()
@Module({})
export class QuickbooksModule {
    public static forRoot(config?: Partial<QuickbooksConfigModel>): DynamicModule {
        return {
            module: QuickbooksModule,
            imports: [QuickBooksAuthModule],
            providers: [
                {
                    provide: GLOBAL_CONFIG,
                    useValue: new QuickbooksConfigModel(config)
                },
                {
                    provide: Store,
                    useClass: LocalStore
                }
            ],
            exports: [GLOBAL_CONFIG, Store]
        };
    }
}
