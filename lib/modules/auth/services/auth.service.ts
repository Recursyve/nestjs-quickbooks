import { HttpService, Injectable } from "@nestjs/common";
import * as OAuthClient from "intuit-oauth";
import { Observable, of } from "rxjs";
import { fromPromise } from "rxjs/internal-compatibility";
import { map } from "rxjs/operators";
import { QuickBooksConfigService } from "../../config/services/quickbooks-config.service";
import { Tokens, QuickBooksStore } from "../../store/store.service";
import { QuickbooksModes } from "../../config/models/quickbooks-config.model";

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
        const res = await this.client.createToken(url);
        this.tokenStore.registerCompany(res.token.realmId);
        this.tokenStore.setToken(res.token.realmId, res.json);
    }

    public getToken(realm: string): Observable<string> {
        const token = this.tokenStore.getToken(realm);
        if (!token) {
            return of(null);
        }
        if (this.validateToken(token)) {
            return of(token.access_token);
        }

        return this.refreshAccessToken(realm, token);
    }

    private validateToken(token: Tokens): boolean {
        if (!token) {
            return false;
        }

        this.client.token.setToken(token);
        return this.client.isAccessTokenValid();
    }

    private refreshAccessToken(realm: string, token: Tokens): Observable<string> {
        return fromPromise(this.client.refreshUsingToken(token)).pipe(
            map((res: any) => {
                const t = res.toJson() as Tokens;
                this.tokenStore.setToken(realm, t);
                return t.access_token;
            })
        );
    }
}
