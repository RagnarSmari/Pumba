import {Job, JobRequest} from "@/types/jobs";
import {apiRequest} from "@/services/apiService";


export async function GetAllJobs(): Promise<ApiResponse<Job[]>>{
    return await apiRequest<Job[]>('GET', '/job/');
}

export async function CreateJob(request : JobRequest): Promise<ApiResponse<Job>>{
    return await apiRequest<Job>('POST', '/job', request);
}