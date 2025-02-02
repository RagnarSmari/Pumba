import {cookies} from "next/headers";
import {pumbaApiRequest} from "@/services/apiService";
import {PagedResponse} from "@/components/data-table/pumba-data-table";



export async function SendRequestT<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    body?: any,
){
    var cookie = (await cookies()).get('pumbaSession')
    return pumbaApiRequest(method, url, body, cookie?.value);
}