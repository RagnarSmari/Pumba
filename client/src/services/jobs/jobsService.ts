import {Job, JobRequest} from "@/types/jobs";
import { apiRequestT} from "@/services/apiService";


export async function GetAllJobs(): Promise<ApiResponse<Job[]>>{
    return await apiRequestT<Job[]>('GET', '/job/');
}

export async function CreateJob(request : JobRequest): Promise<ApiResponse<Job>>{
    return await apiRequestT<Job>('POST', '/job', request);
}