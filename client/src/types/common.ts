
export interface ApiResponse<T> {
    status: number, 
    message: string, 
    error: string,
    data: T | undefined
}

export interface PaginatedResponse<T> {
    Page: number;
    PageSize: number;
    TotalCount: number;
    Data: T[];
}
