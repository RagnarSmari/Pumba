"use client";

import {useState} from "react";
import {ColumnDef} from "@tanstack/table-core";
import {DataTable} from "@/components/data-table/data-table";
import useSWR from "swr";
import {ApiResponse, PaginatedResponse} from "@/types/common";
import {fetcher} from "@/swr/fetcher";


interface QueryParameter{
    key: string;
    value: string;
}


interface PumbaDataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    url: string,
    additionalQueryParameters?: QueryParameter[]
}


export default function PumbaDataTable<TData, TValue>({
    columns,
    url,
    additionalQueryParameters = []
} : PumbaDataTableProps<TData, TValue>){
    const [totalCount, setTotalCount] = useState(0)
    const [pagination, setPagination] = useState({
        pageIndex: 0, // initial page index
        pageSize: 10 // default page size
    });
    const [tableData, setTableData] = useState<TData[]>([])
    const apiURL = process.env.NEXT_PUBLIC_PUMBA_API_URL;
    let options : RequestInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    } 
    
    const params = new URLSearchParams();
    params.append('page', (pagination.pageIndex + 1).toString());
    params.append('pageSize', pagination.pageSize.toString());

    additionalQueryParameters.forEach(param => {
        params.append(param.key, param.value);
    });

    const fullUrl = `${apiURL}${url}?${params.toString()}`;

    const { data, error, isLoading } = useSWR<ApiResponse<PaginatedResponse<TData>>>(
        fullUrl,
        (url: Request | string) => fetcher<ApiResponse<PaginatedResponse<TData>>>(url, options), {
            onSuccess(data, key, config) {
                setTotalCount(data.data.TotalCount);
                setTableData(data.data.Data);
            }
        });
    
    // TODO: set as loader and some skeleton into the data table
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    
    return (
        <DataTable 
            columns={columns}
            data={tableData}
            rowCount={totalCount}
            setPaginationAction={setPagination}
            pagination={pagination}/>
    )
    
}