import { HttpService, Injectable } from "@nestjs/common";
import * as OAuthClient from "intuit-oauth";
import { Observable, of } from "rxjs";
import { fromPromise } from "rxjs/internal-compatibility";
import { map } from "rxjs/operators";
import { QuickbooksConfigService } from "../../config/services/quickbooks-config.service";
import { Tokens, Store } from "../../store/store";

@Injectable()
export class AuthService {
    private readonly client;

    constructor(
        private readonly httpClient: HttpService,
        private readonly configService: QuickbooksConfigService,
        private readonly tokenStore: Store
    ) {
        this.client = new OAuthClient({
            clientId: this.configService.global.clientId,
            clientSecret: this.configService.global.clientSecret,
            environment: "sandbox",
            redirectUri: "http://localhost:3000/quickbooks/auth/return"
        });
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
                const token = res.toJson() as Tokens;
                this.tokenStore.setToken(realm, token);
                return token.access_token;
            })
        );
    }
}
