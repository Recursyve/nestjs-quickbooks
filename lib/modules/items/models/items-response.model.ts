import { QuickBooksQueryResponseModel, QuickBooksResponseModel } from "../../common/models";
import { QuickBooksItems } from "./items.model";

export interface QuickBooksItemsResponseModel {
    Item: QuickBooksItems;
}

export interface QuickBooksItemsQueryResponseModel extends QuickBooksResponseModel {
    QueryResponse: QuickBooksQueryResponseModel & { Item: QuickBooksItems[]; };
}
