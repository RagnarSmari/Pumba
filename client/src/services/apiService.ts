"use client";

const apiURL = process.env.NEXT_PUBLIC_PUMBA_API_URL;

export async function pumbaApiRequest(method: 'POST' | 'GET' | 'PUT' | 'DELETE',url: string, body?: any) {
    const data = await fetch(apiURL + url, {
        method: method,
        credentials: 'include',
        body: JSON.stringify(body)
    });
    return data.json();
    
}

