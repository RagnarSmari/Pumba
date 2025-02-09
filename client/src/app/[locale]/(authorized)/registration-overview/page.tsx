"use client";
import MonthView from "@/app/[locale]/(authorized)/registration-overview/month-view";
import {Timestamp} from "@/types/timestamp";
import {pumbaApiRequest} from "@/services/apiService";
import {useEffect, useState} from "react";
import {PagedResponse} from "@/components/data-table/pumba-data-table";
import {ApiResponse} from "@/types/common";
import {useToast} from "@/components/ui/use-toast";

export default function RegistrationOverview() {
    const [registrations, setRegistrations] = useState<Timestamp[]>([]);
    const toast = useToast()
    useEffect(() => {
        pumbaApiRequest("GET", "/timestamp").then((data : ApiResponse<PagedResponse<Timestamp>>) => {
            if (data.status !== 200) {
                toast.toast({
                    title: "Error fetching data",
                    description: data.error
                })
            }
            else {
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