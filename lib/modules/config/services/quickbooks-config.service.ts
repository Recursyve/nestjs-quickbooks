import { Inject, Injectable } from "@nestjs/common";
import { QuickbooksConfigAuthModel } from "../models/quickbooks-config-auth.model";
import { QuickbooksConfigModel } from "../models/quickbooks-config.model";
import { GLOBAL_CONFIG } from "../../../constants";

@Injectable()
export class QuickbooksConfigService {
    public readonly auth: QuickbooksConfigAuthModel;

    constructor(@Inject(GLOBAL_CONFIG) public readonly global: QuickbooksConfigModel) {
        this.auth = new QuickbooksConfigAuthModel();
    }
}
