
export const fetcher = async <T>(input: RequestInfo, init: RequestInit = {}): Promise<T> => {
    const defaultOptions: RequestInit = {
        credentials: 'include', 
    };

    const finalOptions = { ...defaultOptions, ...init };

    const response = await fetch(input, finalOptions);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
};

export const pumbaFetcher = async <T>(URL: string) => fetcher<T>(URL, options)

let options : RequestInit = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    credentials: 'include'
}

