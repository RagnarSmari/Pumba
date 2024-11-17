"use client"
import useSWR from 'swr';
import {columns} from "@/app/[locale]/(authorized)/jobs/columns";
import {DataTable} from "@/components/data-table/data-table";
import {Job} from "@/types/jobs";
import {fetcher} from "@/swr/fetcher";


interface DataFetch {
    data: Job[]
}

export default function JobsDataTable(){
    const apiURL = process.env.NEXT_PUBLIC_PUMBA_API_URL;
    let options : RequestInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    }
    const { data, error, isLoading } = useSWR<DataFetch>(process.env.NEXT_PUBLIC_PUMBA_API_URL + '/job/', (url: Request | string) => fetcher<DataFetch>(url,options))
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    let jobs: Job[] = [];
    if (data && data.data){
        jobs = data.data
    }
    return (
        <DataTable columns={columns} data={jobs}/>
    );

}