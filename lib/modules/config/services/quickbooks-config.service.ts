import { Inject, Injectable } from "@nestjs/common";
import { QuickbooksConfigAuthModel } from "../models/quickbooks-config-auth.model";
import { QuickBooksConfigModel } from "../models/quickbooks-config.model";
import { GLOBAL_CONFIG } from "../../../constants";

@Injectable()
export class QuickBooksConfigService {
    public readonly auth: QuickbooksConfigAuthModel;

    constructor(@Inject(GLOBAL_CONFIG) public readonly global: QuickBooksConfigModel) {
        this.auth = new QuickbooksConfigAuthModel();
    }
}
