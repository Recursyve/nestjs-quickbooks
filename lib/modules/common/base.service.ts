import { HttpService, Inject, Injectable } from "@nestjs/common";
import { AuthService } from "../auth/services/auth.service";
import { Observable } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import * as os from "os";
import { WhereOptions } from "./models/query.model";
import { QueryUtils } from "../../utils/query.utils";
import * as querystring from "querystring";

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

    protected get<T>(path?: string, queryParams?: object, headers?: object): Observable<T> {
        return this.getHttpHeaders().pipe(
            mergeMap((authHeaders) => this.http.get<T>(this.url(path, queryParams), {
                headers: {
                    ...authHeaders,
                    ...headers
                }
            }))
        ).pipe(
            map(x => x.data)
        );
    }

    protected post<T>(body: any, path?: string, queryParams?: object, headers?: object): Observable<T> {
        return this.getHttpHeaders().pipe(
            mergeMap((authHeaders) => this.http.post<T>(this.url(path, queryParams), body, {
                headers: {
                    ...authHeaders,
                    ...headers
                }
            }))
        ).pipe(
            map(x => x.data)
        );
    }

    protected queryUrl(condition: WhereOptions<any>): string {
        return `${this.sandboxUrl}/v3/company/${this.realm}/query?${QueryUtils.generateQuery(this.resource, condition)}`;
    }

    protected url(path: string, queryParams?: object): string {
        const query = queryParams ? `?${querystring.stringify(queryParams as querystring.ParsedUrlQueryInput)}` : "";
        if (!path) {
            return `${this.sandboxUrl}/v3/company/${this.realm}/${this.resource}${query}`;
        }
        return `${this.sandboxUrl}/v3/company/${this.realm}/${this.resource}/${path}${query}`;
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
