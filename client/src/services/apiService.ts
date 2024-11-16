const apiURL = process.env.NEXT_PUBLIC_PUMBA_API_URL;

const fetcher = (
    input: RequestInfo | URL,
    init?: RequestInit | Promise<Response>
) => fetch(input).then(res => res.json())

export async function apiRequestT<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    body?: any,
    cookie?: string
): Promise<ApiResponse<T>> {
    let options: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
            Cookie : `pumbaSession=${cookie}`
        },
        credentials: 'include',
        body: body ? JSON.stringify(body) : undefined,
    };
    
    const wholeUrl = apiURL + url;
    const response = await fetch(wholeUrl, options);
    const data = await response.json();
    return {
        status: response.status,
        data: data as (T | null),
        error: ""
    }
}

export async function apiRequest(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    body?: any,
    cookie?: string
): Promise<ApiResponse<null>> {
    let options: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
            Cookie : `pumbaSession=${cookie}`
        },
        credentials: 'include',
        body: body ? JSON.stringify(body) : undefined,
    };

    const wholeUrl = apiURL + url;
    const response = await fetch(wholeUrl, options);
    return {
        status: response.status,
        data: null,
        error: ""
    }
}
