"use client";
import PumbaDataTable from "@/components/data-table/pumba-data-table";
import {getColumns} from "@/app/[locale]/(authorized)/registrations/columns";
import {Button} from "@/components/ui/button";
import AddRegistrationDialog from "@/components/dialogs/addRegistration-dialog";
import {DateRangePicker} from "@/components/date-range/date-range";
import React, {useState} from "react";
import {DateRange} from "react-day-picker";
import TimestampDetailDialog from "@/components/dialogs/timestamp-detail-dialog";





export default function Registrations(){
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
    const [isOpen, setIsOpen] = React.useState(false);
    const [currentTimestampId, setCurrentTimestampId] = useState<number | null>(null);


    
    function onDateChanged(dateRange : DateRange | undefined){
        setDateRange(dateRange)
    }
    
    const openOverview = (id: number) => {
        console.log("Opening overview")
        setIsOpen(true)
        setCurrentTimestampId(id);
    }
    const columns = getColumns(openOverview)

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
                {currentTimestampId !== null && (
                    <TimestampDetailDialog id={currentTimestampId} isOpen={isOpen} onOpenChange={setIsOpen} />
                )}
            </div>
        </div>
    );
}