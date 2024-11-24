"use client"

import useSWR from "swr";
import {PaginatedResponse} from "@/types/common";
import {Job} from "@/types/jobs";
import {fetcher} from "@/swr/fetcher";
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from "@/components/ui/select";

export interface JobSelectProps{
   jobId?: number;
   onChange?: (value: number) => void;
}

export default function JobSelect({ jobId , onChange} : JobSelectProps){

    let options : RequestInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    }
    
    const { data, isLoading, error } = useSWR<PaginatedResponse<Job>>(
        process.env.NEXT_PUBLIC_PUMBA_API_URL + "/job/" + `?page=1&pageSize=${Number.MAX_VALUE}` ,
        (url: Request | string) => fetcher<PaginatedResponse<Job>>(url, options));
    let jobs: Job[] = [];
    if (data && data.Data){
        jobs = data.Data;
    }
    
    
    return(
        <Select value={jobId?.toString()} onValueChange={(v) => onChange && onChange(Number(v))}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a job" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Jobs</SelectLabel>
                    {jobs.map((job) => {
                        return (
                            <SelectItem key={job.Id} value={job.Id.toString()}>
                                {job.Name}
                            </SelectItem>
                        )
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
    
}