import { QuickBooksStore } from "./store.service";
import { Injectable } from "@nestjs/common";
import { TokensModel } from "../auth/models/tokens.model";

@Injectable()
export class LocalStore extends QuickBooksStore {
    private companies: string[] = [];
    private tokens: { [realm: string]: TokensModel } = {};

    public async registerCompany(realm: string): Promise<void> {
        if (this.companies.findIndex(x => x === realm) >= 0) {
            return;
        }

        this.companies.push(realm);
    }

    public async getDefaultCompany(): Promise<string> {
        return this.companies[0];
    }

    public async getToken(realm: string): Promise<TokensModel> {
        return this.tokens[realm];
    }

    public async setToken(realm: string, token: TokensModel): Promise<void> {
        this.tokens[realm] = token;
    }
}
