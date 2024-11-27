"use client";
import PumbaDataTable from "@/components/data-table/pumba-data-table";
import {columns} from "@/app/[locale]/(authorized)/registrations/columns";
import {Button} from "@/components/ui/button";
import AddRegistrationDialog from "@/components/dialogs/addRegistration-dialog";
import {DateRangePicker} from "@/components/date-range/date-range";
import {DateRange} from "react-day-picker";
import {useState} from "react";





export default function Registrations(){
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);


    
    function onDateChanged(dateRange : DateRange | undefined){
        setDateRange(dateRange)
    }


    const additionalQueryParameters = dateRange ? [
        { key: 'from', value: dateRange.from?.toISOString() || '' },
        { key: 'to', value: dateRange.to?.toISOString() || '' }
    ] : [];

    
    return (
        <div>
            <div>
                <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                    Skráningar
                </h2>
            </div>
            <div className="container pt-6 pb-0">
                <DateRangePicker onDateChanged={onDateChanged}/>
            </div>
            <div className="container mx-auto py-6 flex flex-col items-stretch justify-center">
                <div className="flex justify-end py-3">
                    <AddRegistrationDialog trigger={(
                        <Button variant="default">Add</Button>
                    )}/>
                </div>
                <PumbaDataTable
                    url={`/timestamp/`}
                    columns={columns}
                    additionalQueryParameters={additionalQueryParameters}/>
            </div>
        </div>
    );
}