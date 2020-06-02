export interface TokensModel {
    refresh_token: string;
    access_token: string;
    token_type: string;
    expires_in: number;
    x_refresh_token_expires_in: number;
}
