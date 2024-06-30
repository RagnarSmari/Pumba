"use server";


import {CreateJob} from "@/services/jobs/jobsService";
import {Job} from "@/types/jobs";

export async function CreateJobAction(name: string): Promise<Job | string>{
    return await CreateJob({name});
}