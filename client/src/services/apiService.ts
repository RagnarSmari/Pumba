import axios from "axios";
import { redirect } from "react-router-dom";
const base_path = import.meta.env.VITE_API_BASE_URL;

interface RequestValues {
    path: string;
    method: "GET" | "POST" | "DELETE" | "PUT" | "PATCH" | "HEAD";
    requestBody: object;
}

interface PostRequestValues {
    path: string;
    requestBody: object;
}

interface GetRequestValues {
    path: string;
}

export async function PostRequest<T>(request: PostRequestValues): Promise<T> {
    return Request<T>({
        path: request.path,
        method: "POST",
        requestBody: request.requestBody
    });
}



export async function GetRequest<T>(request: GetRequestValues): Promise<T> {
    return Request<T>({
        path: request.path,
        method: "GET",
        requestBody: {}
    });
}

async function Request<T>(request: RequestValues): Promise<T> {
    const url = base_path + request.path;
    try {
        const res = await axios.request({
            method: request.method,
            url: url,
            data: request.requestBody,
            withCredentials: true,
        });
        return res.data; // Return the data part of the response
    } catch (err : unknown) {
        if (axios.isAxiosError(err)) {
            if (err.response && err.response.status === 401) {
                redirect("/");
            }
        }
        // TODO Remove "user" localstorage item
        throw err;
    }
}
