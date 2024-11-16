// const fetcher = (
//     input: RequestInfo | URL,
//     init?: RequestInit | undefined
// ) => fetch(input, init).then(res => res.json())

export const fetcher = async <T>(input: RequestInfo, init?: RequestInit): Promise<T> => {
    const response = await fetch(input, init);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}
