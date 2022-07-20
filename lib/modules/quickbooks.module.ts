import { ModuleMetadata } from "@nestjs/common/interfaces";
import { QuickBooksConfigModel } from "./config/models/quickbooks-config.model";
import { DynamicModule, Global, Module, Provider } from "@nestjs/common";
import { QuickBooksStore } from "./store/store.service";
import { LocalStore } from "./store/local.store";
import { QuickBooksAuthModule } from "./auth/auth.module";
import { GLOBAL_CONFIG } from "../constants";
import { QuickbooksWebhooksModule, QuickbooksWebhooksOptions } from "./webhooks/webhooks.module";

export interface QuickBooksOptions extends Pick<ModuleMetadata, "imports"> {
    config?: Partial<QuickBooksConfigModel>;
    store?: Provider;
    webhooks?: QuickbooksWebhooksOptions;
}

@Global()
@Module({})
export class QuickBooksModule {
    public static forRoot(options?: QuickBooksOptions): DynamicModule {
        if (!options.store) {
            options.store = {
                provide: QuickBooksStore,
                useClass: LocalStore
            };
        }

        const imports = [];
        if (options.webhooks) {
            imports.push(QuickbooksWebhooksModule.forRoot(options.webhooks));
        }


        return {
            module: QuickBooksModule,
            imports: [QuickBooksAuthModule, ...imports, ...(options.imports ?? [])],
            providers: [
                {
                    provide: GLOBAL_CONFIG,
                    useValue: new QuickBooksConfigModel(options.config)
                },
                options.store
            ],
            exports: [GLOBAL_CONFIG, QuickBooksStore]
        };
    }
}
