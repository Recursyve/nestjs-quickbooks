import { Tokens, Store } from "./store";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LocalStore extends Store {
    private companies: string[] = [];
    private tokens: { [realm: string]: Tokens } = {};

    public registerCompany(realm: string): void {
        if (this.companies.findIndex(x => x === realm) >= 0) {
            return;
        }

        this.companies.push(realm);
    }

    public getDefaultCompany(): string {
        return this.companies[0];
    }

    public getToken(realm: string): Tokens {
        return this.tokens[realm];
    }

    public setToken(realm: string, token: Tokens): void {
        this.tokens[realm] = token;
    }
}
