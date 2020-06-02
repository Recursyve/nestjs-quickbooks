import { HttpService, Injectable } from "@nestjs/common";
import { OAuthClient, Token } from "intuit-oauth";
import { Observable, of } from "rxjs";
import { fromPromise } from "rxjs/internal-compatibility";
import { map, mergeMap } from "rxjs/operators";
import { QuickBooksConfigService } from "../../config/services/quickbooks-config.service";
import { QuickBooksStore } from "../../store";
import { QuickbooksModes } from "../../config";
import { TokensModel } from "..";

@Injectable()
export class QuickBooksAuthService {
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
        await this.client.createToken(url);
        const token = this.client.getToken().getToken();
        await this.tokenStore.registerCompany(token.realmId);
        await this.tokenStore.setToken(token.realmId, token);
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

    private validateToken(token: TokensModel): boolean {
        if (!token) {
            return false;
        }

        this.client.setToken(token);
        return this.client.isAccessTokenValid();
    }

    private refreshAccessToken(realm: string, token: TokensModel): Observable<string> {
        return fromPromise(this.client.refreshUsingToken(token)).pipe(
            map(() => {
                const newToken = this.client.getToken().getToken();
                this.tokenStore.setToken(realm, newToken);
                return newToken.access_token;
            })
        );
    }
}
