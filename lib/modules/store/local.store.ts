import { Tokens, QuickBooksStore } from "./store.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LocalStore extends QuickBooksStore {
    private companies: string[] = [];
    private tokens: { [realm: string]: Tokens } = {};

    public async registerCompany(realm: string): Promise<void> {
        if (this.companies.findIndex(x => x === realm) >= 0) {
            return;
        }

        this.companies.push(realm);
    }

    public async getDefaultCompany(): Promise<string> {
        return this.companies[0];
    }

    public async getToken(realm: string): Promise<Tokens> {
        return this.tokens[realm];
    }

    public async setToken(realm: string, token: Tokens): Promise<void> {
        this.tokens[realm] = token;
    }
}
