



export type Pagination = {
    pageIndex: number;
    pageSize: number;
}


export type UsePaginationResult<T> = {
    items: T[];
    pagination: Pagination;
    totalCount: number;
    isLoading: boolean;
    error: string | undefined;
}
