import {GET, POST} from "@/services/apiService";
import {Job, JobRequest} from "@/types/jobs";


export async function GetAllJobs(): Promise<Job[]>{
    try {
        let res = await GET("job");
        let data: Job[] = await res.json();
        return data;
    }catch (error){
        console.error(error);
        return [];
    }
}

export async function CreateJob(request : JobRequest): Promise<Job | string>{
    const props = {
        url: "job",
        body: {
            "name": request.name,
        }
    }
    let res = await POST(props);
    if (res.status !== 200){
        // TODO return the error as string
        return await res.json();
    }
    return await res.json();
}