import { QuickBooksTaxCodes } from "./tax-codes.model";
import { QuickBooksQueryResponseModel, QuickBooksResponseModel } from "../../common";

export interface QuickBooksTaxCodesResponseModel extends QuickBooksResponseModel {
    TaxCode: QuickBooksTaxCodes;
}

export interface QuickBooksTaxCodesQueryResponseModel extends QuickBooksResponseModel {
    QueryResponse: QuickBooksQueryResponseModel & { TaxCode: QuickBooksTaxCodes[]; };
}
