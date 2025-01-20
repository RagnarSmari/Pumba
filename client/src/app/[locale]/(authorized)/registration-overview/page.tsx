"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useFormatter } from "next-intl";

type DateRange = {
    startDate: Date;
    endDate: Date;
};

export default function RegistrationOverview() {
    const format = useFormatter();
    const [dateRange, setDateRange] = useState<DateRange>(() => {
        // Initialize date range
        const initialDate = new Date();
        return {
            startDate: new Date(initialDate.getFullYear(), initialDate.getMonth(), 1),
            endDate: new Date(initialDate.getFullYear(), initialDate.getMonth() + 1, 0),
        };
    });

    function lastMonth() {
        const newStartDate = new Date(dateRange.startDate.getFullYear(), dateRange.startDate.getMonth() - 1, 1);
        const newEndDate = new Date(newStartDate.getFullYear(), newStartDate.getMonth() + 1, 0);
        setDateRange({
            startDate: newStartDate,
            endDate: newEndDate,
        });
    }

    function nextMonth() {
        const newStartDate = new Date(dateRange.startDate.getFullYear(), dateRange.startDate.getMonth() + 1, 1);
        const newEndDate = new Date(newStartDate.getFullYear(), newStartDate.getMonth() + 1, 0);
        setDateRange({
            startDate: newStartDate,
            endDate: newEndDate,
        });
    }

    const daysInRange = (() => {
        const days: Date[] = [];
        let currentDate = new Date(dateRange.startDate);

        while (currentDate <= dateRange.endDate) {
            days.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return days;
    })();
    
    let formattedDateRangeStartDay = format.dateTime(dateRange.startDate, {
        day: "numeric",
        year: "numeric",
        month: "long",
    })
    let formattedDateRangeEndDay = format.dateTime(dateRange.endDate, {
        day: "numeric",
        month: "long",
        year: "numeric",
    })

    return (
        <div>
            <div className="flex justify-between">
                <Button onClick={lastMonth} variant="outline" size="icon">
                    <ChevronLeft />
                </Button>
                <p>
                    {formattedDateRangeStartDay} - {formattedDateRangeEndDay}
                </p>
                <Button onClick={nextMonth} variant="outline" size="icon">
                    <ChevronRight />
                </Button>
            </div>
            <div>
                {daysInRange.map((day) => {
                    let formattedDay = format.dateTime(day, {
                        day: "numeric",
                        weekday: "long",
                        month: "long",
                    })
                    
                    return (
                        <div
                            key={day.toISOString()} 
                            className="border-black border-solid border-[1px] w-full h-[100px]">
                            <p>{formattedDay}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}