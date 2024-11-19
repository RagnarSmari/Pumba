"use client";

import {useState} from "react";
import {ColumnDef} from "@tanstack/table-core";
import {DataTable} from "@/components/data-table/data-table";
import useSWR from "swr";
import {PaginatedResponse} from "@/types/common";
import {fetcher} from "@/swr/fetcher";

interface PumbaDataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    url: string
}


export default function PumbaDataTable<TData, TValue>({
    columns,
    url
} : PumbaDataTableProps<TData, TValue>){
    const [totalCount, setTotalCount] = useState(0)
    const [pagination, setPagination] = useState({
        pageIndex: 0, // initial page index
        pageSize: 10 // default page size
    });
    const apiURL = process.env.NEXT_PUBLIC_PUMBA_API_URL;
    let options : RequestInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    }
    const { data, error, isLoading } = useSWR<PaginatedResponse<TData>>(
        apiURL + url + `?page=${pagination.pageIndex + 1}&pageSize=${pagination.pageSize}`,
        (url: Request | string) => fetcher<PaginatedResponse<TData>>(url, options),{
            onSuccess(data){
                setTotalCount(data.TotalCount)
            }
        });
    let pumbaData: TData[] = [];
    if (data && data.Data){
       pumbaData = data.Data; 
    }


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
            data={pumbaData}
            rowCount={totalCount}
            setPaginationAction={setPagination}
            pagination={pagination}/>
    )
    
}