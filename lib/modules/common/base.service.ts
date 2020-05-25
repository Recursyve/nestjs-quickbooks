import { HttpService, Inject, Injectable } from "@nestjs/common";
import { AuthService } from "../auth/services/auth.service";
import { Observable } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import * as os from "os";
import { WhereOptions } from "./models/query.model";
import { QueryUtils } from "../../utils/query.utils";

@Injectable()
export class BaseService<T, Query, QueryResponse> {
    private readonly sandboxUrl = "https://sandbox-quickbooks.api.intuit.com";
    private readonly liveUrl = "https://quickbooks.api.intuit.com";

    constructor(
        private readonly realm: string,
        private readonly resource: string,
        private readonly authService: AuthService,
        private readonly http: HttpService
    ) {}

    public query(condition: WhereOptions<Query>): Observable<QueryResponse> {
        return this.getHttpHeaders().pipe(
            mergeMap((headers) => this.http.get<QueryResponse>(this.queryUrl(condition), {
                headers,
            }))
        ).pipe(
            map(x => x.data)
        );
    }

    protected get<T>(path?: string): Observable<T> {
        return this.getHttpHeaders().pipe(
            mergeMap((headers) => this.http.get<T>(this.url(path), {
                headers,
            }))
        ).pipe(
            map(x => x.data)
        );
    }

    protected queryUrl(condition: WhereOptions<any>): string {
        return `${this.sandboxUrl}/v3/company/${this.realm}/query?${QueryUtils.generateQuery(this.resource, condition)}`;
    }

    protected url(path: string): string {
        if (!path) {
            return `${this.sandboxUrl}/v3/company/${this.realm}/${this.resource}`;
        }
        return `${this.sandboxUrl}/v3/company/${this.realm}/${this.resource}/${path}`;
    }

    private getHttpHeaders(): Observable<any> {
        return this.authService.getToken(this.realm).pipe(
            map((token) => ({
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
                "User-Agent": `Intuit-OAuthClient-JS/3.0.1/${os.release()}/${os.platform()}`
            }))
        );
    }
}
