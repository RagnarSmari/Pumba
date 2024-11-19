export interface PaginatedResponse<T> {
    Page: number;
    PageSize: number;
    TotalCount: number;
    Data: T[];
    Status: number;
    Error: string;
    
    
}