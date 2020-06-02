import { HttpService, Injectable } from "@nestjs/common";
import * as OAuthClient from "intuit-oauth";
import { Observable, of } from "rxjs";
import { fromPromise } from "rxjs/internal-compatibility";
import { map, mergeMap } from "rxjs/operators";
import { QuickBooksConfigService } from "../../config/services/quickbooks-config.service";
import { QuickBooksStore } from "../../store";
import { QuickbooksModes } from "../../config";
import { DatedTokensModel } from "../models/dated-tokens.model";

@Injectable()
export class QuickBooksAuthService {
    private readonly ACCESS_TOKEN_TTL = 60 * 1000;
    private readonly client;

    constructor(
        private readonly httpClient: HttpService,
        private readonly configService: QuickBooksConfigService,
        private readonly tokenStore: QuickBooksStore
    ) {
        this.client = new OAuthClient({
            clientId: this.configService.global.clientId,
            clientSecret: this.configService.global.clientSecret,
            environment: this.configService.global.mode,
            redirectUri: `${this.configService.global.serverUri}/quickbooks/auth/return`
        });
    }

    public get mode(): QuickbooksModes {
        return this.configService.global.mode;
    }

    public getAuthorizeUri(): string {
        return this.client.authorizeUri({
            scope: this.configService.global.scopes,
            state: "nestjs-client-state"
        });
    }

    public async authorizeCode(url: string): Promise<void> {
        const res = await this.client.createToken(url);
        await this.tokenStore.registerCompany(res.token.realmId);
        await this.tokenStore.setToken(res.token.realmId, { ...res.json, created_at: Date.now() });
    }

    public getToken(realm: string): Observable<string> {
        return fromPromise(this.tokenStore.getToken(realm)).pipe(
            mergeMap((token) => {
                if (!token) {
                    return of(null);
                }

                if (this.validateToken(token)) {
                    return of(token.access_token);
                }

                return this.refreshAccessToken(realm, token);
            })
        );
    }

    private validateToken(token: DatedTokensModel): boolean {
        if (!token) {
            return false;
        }

        const expiry = token.created_at + (token.expires_in * 1000);
        return (expiry - this.ACCESS_TOKEN_TTL > Date.now());
    }

    private refreshAccessToken(realm: string, token: DatedTokensModel): Observable<string> {
        return fromPromise(this.client.refreshUsingToken(token)).pipe(
            map((res: any) => {
                const newToken = { ...res.toJson(), created_at: Date.now() } as DatedTokensModel;
                this.tokenStore.setToken(realm, newToken);
                return newToken.access_token;
            })
        );
    }
}
