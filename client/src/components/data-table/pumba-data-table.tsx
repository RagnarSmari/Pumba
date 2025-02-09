"use client";

import {ColumnDef} from "@tanstack/table-core";
import {DataTable} from "@/components/data-table/data-table";
import {useState} from "react";
import useSWR, {mutate} from "swr";
import {ApiResponse} from "@/types/common";
import {fetcher} from "@/swr/fetcher";
import {SortingState} from "@tanstack/react-table";

interface QueryParameter{
    key: string;
    value: string;
}

export type Pagination = {
    pageIndex: number;
    pageSize: number;
}

export interface PagedResponse<TData>{
    Data: TData[];
    TotalCount: number;
    PageIndex: number;
    PageSize: number;
}


interface PumbaDataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    url: string;
    additionalQueryParameters?: QueryParameter[]; // New prop for additional query parameters
}


export default function PumbaDataTable<TData, TValue>({
    columns,
    url, 
    additionalQueryParameters = [], 
} : PumbaDataTableProps<TData, TValue>){

    const [pagination, setPagination] = useState<Pagination>({
        pageIndex: 0, // initial page index
        pageSize: 10// default page size
    });
    const [sorting, setSorting] = useState<SortingState>([])
    console.log(sorting)
    
    const apiUrl = process.env.NEXT_PUBLIC_PUMBA_API_URL;
    const constructQueryString = () => {
        const queryParams = [
            `page=${pagination.pageIndex + 1}`,
            `pageSize=${pagination.pageSize}`,
            `orderBy=${sorting.map((s) => `${s.id}:${s.desc ? "desc" : "asc"}`)}`,
            ...additionalQueryParameters.map((param) => `${param.key}=${encodeURIComponent(param.value)}`),
        ];

        return queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
    };

    const fullUrl = `${apiUrl}${url}${constructQueryString()}`;
    const {data, error, isLoading } = useSWR<ApiResponse<PagedResponse<TData>>>(fullUrl, fetcher)
    
    if (error) return <div>failed to load</div>

    return (
        <DataTable 
            columns={columns}
            data={data?.data.Data || []}
            rowCount={data?.data.TotalCount || 0}
            pagination={pagination}
            setPagination={setPagination} 
            isLoading={isLoading}
            sorting={sorting}
            setSorting={setSorting}/>
        
    )
    
}