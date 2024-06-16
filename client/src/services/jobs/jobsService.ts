import {GET, POST} from "@/services/apiService";
import {Job} from "@/types/jobs";


export async function GetAllJobs(){
    try {
        let res = await GET("job");
        let data: Job[] = await res.json();
        return data;
    }catch (error){
        console.error(error);
        return [];
    }
}