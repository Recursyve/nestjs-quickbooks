import { Injectable } from "@nestjs/common";
import { DatedTokensModel } from "../auth/models/dated-tokens.model";

@Injectable()
export abstract class QuickBooksStore {
    public abstract async registerCompany(realm: string): Promise<void>;
    public abstract async getDefaultCompany(): Promise<string>;
    public abstract async setToken(realm: string, token: DatedTokensModel): Promise<void>;
    public abstract async getToken(realm: string): Promise<DatedTokensModel>;
}
