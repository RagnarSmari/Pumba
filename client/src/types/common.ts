
export interface ApiResponse<T> {
    status: number, 
    message: string, 
    error: string,
    data: T 
}

export interface PaginatedResponse<T> {
    Page: number;
    PageSize: number;
    TotalCount: number;
    Data: T[];
}


export type DateRange = {
    startDate: Date;
    endDate: Date;
};
