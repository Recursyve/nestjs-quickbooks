import { Injectable } from "@nestjs/common";

export interface Tokens {
    refresh_token: string;
    access_token: string;
    token_type: string;
    expires_in: number;
    x_refresh_token_expires_in: number;
}

@Injectable()
export abstract class QuickBooksStore {
    public abstract async registerCompany(realm: string): Promise<void>;
    public abstract async getDefaultCompany(): Promise<string>;
    public abstract async setToken(realm: string, token: Tokens): Promise<void>;
    public abstract async getToken(realm: string): Promise<Tokens>;
}
