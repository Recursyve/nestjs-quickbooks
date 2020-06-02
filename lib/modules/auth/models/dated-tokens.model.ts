import { TokensModel } from "./tokens.model";

export interface DatedTokensModel extends TokensModel {
    created_at: number;
}
