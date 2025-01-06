import {ApiResponse} from "@/types/common";

export const fetcher = async <T>(input: RequestInfo, init?: RequestInit): Promise<T> => {
    const response = await fetch(input, init);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}


export const pumbaFetcher = async <T>(URL: string) => fetcher<ApiResponse<T>>(URL, options)

let options : RequestInit = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    credentials: 'include'
}

