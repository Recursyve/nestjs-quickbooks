export interface QuickBooksResponseModel {
    time: string;
}

export interface QuickBooksDeleteResponseModel {
    status: string;
    domain: string;
    Id: string;
}

export interface QuickBooksQueryResponseModel {
    startPosition: number;
    maxResults: number;
    totalCount: number;
}
