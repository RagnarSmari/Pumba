"use client";
import MonthView from "@/app/[locale]/(authorized)/registration-overview/month-view";
import {Timestamp} from "@/types/timestamp";
import {pumbaApiRequest} from "@/services/apiService";
import {useEffect, useState} from "react";
import {PagedResponse} from "@/components/data-table/pumba-data-table";
import {ApiResponse} from "@/types/common";

export default function RegistrationOverview() {
    const [registrations, setRegistrations] = useState<Timestamp[]>([]);
    useEffect(() => {
        pumbaApiRequest("GET", "/timestamp").then((data : ApiResponse<PagedResponse<Timestamp>>) => {
            if (data.status !== 200) {
                throw new Error(`Error fetching data. Status code: ${data.status}`)
            }
            else {
                console.log(data)
                setRegistrations(data.data.Data)
            }
        }).catch(Error => {
            console.error(Error)
        });
    }, []);
    
    return (
        <MonthView Registrations={registrations}/>
    );
}