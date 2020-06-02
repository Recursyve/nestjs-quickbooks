import { QuickBooksStore } from "./store.service";
import { Injectable } from "@nestjs/common";
import { DatedTokensModel } from "../auth/models/dated-tokens.model";

@Injectable()
export class LocalStore extends QuickBooksStore {
    private companies: string[] = [];
    private tokens: { [realm: string]: DatedTokensModel } = {};

    public async registerCompany(realm: string): Promise<void> {
        if (this.companies.findIndex(x => x === realm) >= 0) {
            return;
        }

        this.companies.push(realm);
    }

    public async getDefaultCompany(): Promise<string> {
        return this.companies[0];
    }

    public async getToken(realm: string): Promise<DatedTokensModel> {
        return this.tokens[realm];
    }

    public async setToken(realm: string, token: DatedTokensModel): Promise<void> {
        this.tokens[realm] = token;
    }
}
