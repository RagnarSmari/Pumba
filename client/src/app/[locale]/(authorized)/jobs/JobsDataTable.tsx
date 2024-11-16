"use client"
import useSWR from 'swr';
import {columns} from "@/app/[locale]/(authorized)/jobs/columns";
import {DataTable} from "@/components/data-table/data-table";
import {Job} from "@/types/jobs";
import {fetcher} from "@/swr/fetcher";


export default function JobsDataTable(){
    const apiURL = process.env.NEXT_PUBLIC_PUMBA_API_URL;
    const { data, error, isLoading } = useSWR<Job[]>(apiURL + '/job', fetcher)
    
    return (
        <DataTable columns={columns} data={data ?? []}/>
    )
}