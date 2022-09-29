import { QuickBooksDeleteResponseModel, QuickBooksResponseModel } from "../../common";
import { QuickBooksAttachables } from "./attachables.model";

export interface QuickBooksAttachablesResponseModel extends QuickBooksResponseModel {
    Attachable: QuickBooksAttachables;
}

export interface QuickBooksAttachablesQueryResponseModel extends QuickBooksResponseModel {
    QueryResponse: QuickBooksResponseModel & { Attachable: QuickBooksAttachables[]; };
}

export interface QuickBooksAttachablesDeleteResponseModel extends  QuickBooksResponseModel {
    Attachable: QuickBooksDeleteResponseModel;
}

export interface QuickBooksAttachablesUploadResponseModel extends QuickBooksResponseModel {
    AttachableResponse: QuickBooksAttachablesResponseModel[];
}
