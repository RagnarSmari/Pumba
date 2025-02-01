import {UsePaginationResult, Pagination} from "@/types/pagination";
import useSWR from "swr";
import {fetcher} from "@/swr/fetcher";
import {ApiResponse} from "@/types/common";
import {PagedResponse} from "@/components/data-table/pumba-data-table";

export function usePagination<T>(pagination : Pagination, url : string) : UsePaginationResult<T> {

    let fullUrl = `${url}?pageIndex=${pagination.pageIndex}&pageSize=${pagination.pageSize}`
    const { data, error, isLoading } = useSWR<ApiResponse<PagedResponse<T>>>(fullUrl,  fetcher)
    return {
        items: data?.data?.data || [],
        pagination,
        totalCount: data?.data?.totalCount || 0,
        isLoading,
        error: error?.message,
    }
}