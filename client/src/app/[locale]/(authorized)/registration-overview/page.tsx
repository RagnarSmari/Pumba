import MonthView from "@/app/[locale]/(authorized)/registration-overview/month-view";
import {cookies} from "next/headers";
import {Timestamp} from "@/types/timestamp";
import {ApiResponse, PaginatedResponse} from "@/types/common";

export default async function RegistrationOverview() {
    const apiURL = process.env.NEXT_PUBLIC_PUMBA_API_URL;
    const url = `${apiURL}/timestamp`;
    const cookieHeaders = await cookies();
    let registrations : Timestamp[] = [];
    
    const data = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': cookieHeaders.toString()
        }
        
    })
    const res : ApiResponse<PaginatedResponse<Timestamp>> = await data.json();
    console.log(res);
    
    if (res.data) registrations = res.data.Data;
    
    return (
        <MonthView Registrations={registrations}/>
    );
}