import { Injectable } from "@nestjs/common";
import { TokensModel } from "../auth/models/tokens.model";

@Injectable()
export abstract class QuickBooksStore {
    public abstract registerCompany(realm: string): Promise<void>;
    public abstract getDefaultCompany(): Promise<string | null>;
    public abstract setToken(realm: string, token: TokensModel): Promise<void>;
    public abstract getToken(realm: string): Promise<TokensModel | null>;
}
