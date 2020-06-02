import { TokensModel } from "./tokens.model";

export interface DatedTokensModel extends TokensModel {
    created_at: number;
    refresh_token: string;
    access_token: string;
    token_type: string;
    expires_in: number;
    x_refresh_token_expires_in: number;
}
