"use client";

import React, { useEffect, useState } from 'react';
import { DataTable } from "@/components/data-table/data-table";
import { GetAllJobs } from "@/services/jobs/jobsService";
import { Job } from "@/types/jobs";
import {columns} from "@/app/[locale]/(authorized)/jobs/columns";

export default function JobsDataTable() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchJobs() {
            try {
                const data = await GetAllJobs();
                setJobs(data);
            } catch (error: any) {
                console.error("Error fetching jobs:", error);
                setError(error.message || "An error occurred while fetching jobs.");
            } finally {
                setLoading(false);
            }
        }
        fetchJobs();
    }, []);

    if (loading) {
        return <div>Loading jobs...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return <DataTable columns={columns} data={jobs} />;
}
