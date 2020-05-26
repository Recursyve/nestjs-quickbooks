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
    public abstract registerCompany(realm: string): void;
    public abstract getDefaultCompany(): string;
    public abstract setToken(realm: string, token: Tokens): void;
    public abstract getToken(realm: string): Tokens;
}
