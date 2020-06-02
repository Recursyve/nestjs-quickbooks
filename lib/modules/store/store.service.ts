import { Injectable } from "@nestjs/common";
import { TokensModel } from "../auth/models/tokens.model";

@Injectable()
export abstract class QuickBooksStore {
    public abstract async registerCompany(realm: string): Promise<void>;
    public abstract async getDefaultCompany(): Promise<string>;
    public abstract async setToken(realm: string, token: TokensModel): Promise<void>;
    public abstract async getToken(realm: string): Promise<TokensModel>;
}
