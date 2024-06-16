import {cookies} from "next/headers";
import {all} from "axios";

const apiURL = process.env.NEXT_PUBLIC_PUMBA_API_URL;

function CreateUrl(url: string){
    return `${apiURL}/${url}`;
}

export async function GET(url: string){
    const obj = {
        url: CreateUrl(url),
        method: "GET",
    }
    return await REQUEST(obj);
}

interface POSTProps {
    url: string;
    body: object;
}
export async function POST(props: POSTProps){
    const obj = {
        url: CreateUrl(props.url),
        method: "POST",
        body: props.body
    }
    return await REQUEST(obj);
}

interface REQUESTProps {
    url: string;
    method: string;
    body?: object;
}
async function REQUEST(props: REQUESTProps){
    console.log("Making request")
    let cookieStore = cookies();
    let allcookies = cookieStore.get("__session");
    let sessionCookie = "";
    if (allcookies){
        sessionCookie = "__session=" + allcookies.value;
    }

    return await fetch(props.url, {
        method: props.method,
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Cookie": sessionCookie
        },
        body: JSON.stringify(props.body)
    })
}