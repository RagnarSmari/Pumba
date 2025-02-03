import MonthView from "@/app/[locale]/(authorized)/registration-overview/month-view";
import {Timestamp} from "@/types/timestamp";
import {pagedFetching} from "@/services/apiService";

export default async function RegistrationOverview() {
    const url = "/timestamp";
    let registrations : Timestamp[] = [];
    const data = await pagedFetching<Timestamp>(url);
    if(data?.Data) registrations = data.Data;
    
    return (
        <MonthView Registrations={registrations}/>
    );
}