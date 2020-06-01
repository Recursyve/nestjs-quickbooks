import { QuickBooksQueryResponseModel, QuickBooksResponseModel } from "../../common/models";
import { QuickBooksVendors } from "./vendors.model";

export interface QuickBooksVendorsResponseModel extends QuickBooksResponseModel {
    Vendor: QuickBooksVendors;
}

export interface QuickBooksVendorsQueryResponseModel extends QuickBooksResponseModel {
    QueryResponse: QuickBooksQueryResponseModel & { Vendor: QuickBooksVendors[]; };
}
