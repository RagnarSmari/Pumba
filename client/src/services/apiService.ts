"use server";
import {ApiResponse, PaginatedResponse} from "@/types/common";
import {cookies} from "next/headers";

const apiURL = process.env.NEXT_PUBLIC_PUMBA_API_URL;

export async function pagedFetching<T>(url: string): Promise<PaginatedResponse<T> | undefined> {
    const response= await pumbaApiFetcher<PaginatedResponse<T>>('GET', url);
    return response.data;
}

export async function apiRequest<T>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, body?: any, cookie?: string) {
    return await pumbaApiFetcher<T>(method,url, body);
}

export async function postApiRequest<T>(url: string, body?: any) {
    const cookieHeaders = await cookies();
    const data = await fetch(apiURL + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': cookieHeaders.toString(),
        },
        body: JSON.stringify(body)
    });
    return data.json();
    
}

async function pumbaApiFetcher<T>(method: 'GET' | 'POST' | 'DELETE' | 'PUT', url: string, body? : any): Promise<ApiResponse<T>> {
    const cookieHeaders = await cookies();
    const data = await fetch(apiURL + url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Cookie': cookieHeaders.toString(),
        },
        body: JSON.stringify(body)
    });
    return data.json();
}