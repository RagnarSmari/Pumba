"use client";

import { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { DateRange } from "@/types/common";
import {Comment} from "@/types/comment";
import {Timestamp} from "@/types/timestamp";

type MonthViewProps = {
    Registrations : Timestamp[]
}


export default function MonthView( props : MonthViewProps) {
    const date = new Date();
    const [dateRange, setDateRange] = useState<DateRange>({
        startDate: new Date(date.getFullYear(), date.getMonth(), 1),
        endDate: new Date(date.getFullYear(), date.getMonth() + 1, 0),
    });

    const [selectedDay, setSelectedDay] = useState<string | null>(null); // Track which day is expanded
    const [expandedRegistrations, setExpandedRegistrations] = useState<Record<number, boolean>>({}); // Track expanded registrations

    const toggleRegistration = (registrationId: number) => {
        setExpandedRegistrations((prev) => ({
            ...prev,
            [registrationId]: !prev[registrationId], // Toggle comment visibility for the registration
        }));
    };

    // Format the visible date range
    let formattedDateRangeStartDay = new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(dateRange.startDate);
    let formattedDateRangeEndDay = new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(dateRange.endDate);

    // Get all days in the date range
    const daysInRange = (() => {
        const days: Date[] = [];
        let currentDate = new Date(dateRange.startDate);

        while (currentDate <= dateRange.endDate) {
            days.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return days;
    })();

    // Count registrations and group them by date
    const registrationsByDate = props.Registrations.reduce((acc: Record<string, Timestamp[]>, entry) => {
        const dateKey = new Date(entry.CreatedAt).toDateString(); // Use only the date part as the key
        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push(entry);
        return acc;
    }, {});

    const toggleDayDetails = (dayKey: string) => {
        setSelectedDay((prev) => (prev === dayKey ? null : dayKey)); // Toggle open/close
    };

    // Navigation for months
    const lastMonth = () => {
        const newStartDate = new Date(dateRange.startDate.getFullYear(), dateRange.startDate.getMonth() - 1, 1);
        const newEndDate = new Date(dateRange.startDate.getFullYear(), dateRange.startDate.getMonth(), 0);
        setDateRange({
            startDate: newStartDate,
            endDate: newEndDate,
        });
    };

    const nextMonth = () => {
        const newStartDate = new Date(dateRange.startDate.getFullYear(), dateRange.startDate.getMonth() + 1, 1);
        const newEndDate = new Date(dateRange.endDate.getFullYear(), dateRange.endDate.getMonth() + 2, 0);
        setDateRange({
            startDate: newStartDate,
            endDate: newEndDate,
        });
    };

    return (
        <div>
            {/* Month Selector */}
            <div className="flex justify-between pt-3">
                <button
                    onClick={lastMonth}
                    className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-200"
                >
                    Previous
                </button>
                <p>
                    {formattedDateRangeStartDay} - {formattedDateRangeEndDay}
                </p>
                <button
                    onClick={nextMonth}
                    className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-200"
                >
                    Next
                </button>
            </div>

            {/* List of Days */}
            <div className="pt-10">
                {daysInRange.map((day) => {
                    const dayKey = day.toDateString();
                    const dayRegistrations = registrationsByDate[dayKey] || [];
                    return (
                        <div key={dayKey} className="mb-4 w-full">
                            <div
                                className="flex justify-between items-center bg-gray-100 border border-gray-300 rounded-lg shadow-sm px-4 py-3"
                            >
                                <div>
                                    <p className="text-lg font-medium text-gray-800">
                                        {day.toLocaleDateString("en-US", {
                                            weekday: "long",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {dayRegistrations.length} registration
                                        {dayRegistrations.length !== 1 ? "s" : ""}
                                    </p>
                                </div>

                                {/*toggle*/}
                                <button
                                    onClick={() => toggleDayDetails(dayKey)}
                                    className="text-gray-500 hover:text-gray-800"
                                >
                                    {selectedDay === dayKey ? (
                                        <ChevronDownIcon className="w-6 h-6" />
                                    ) : (
                                        <ChevronRightIcon className="w-6 h-6" />
                                    )}
                                </button>
                            </div>

                            {/*registrations in a day */}
                            {selectedDay === dayKey && dayRegistrations.length > 0 && (
                                <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-4 mt-2">
                                    {dayRegistrations.map((reg : Timestamp) => (
                                        <div key={reg.Id} className="mb-4">
                                            <div
                                                className="flex justify-between items-center"
                                            >
                                                <div>
                                                    <p className="text-sm font-medium">
                                                        Job: {reg.JobName}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        User: {reg.UserName}
                                                    </p>
                                                    <p className="text-sm font-medium">
                                                        Hours: {reg.TotalHours}h{" "}
                                                        {reg.TotalMinutes}m
                                                    </p>
                                                </div>
                                                
                                                {/* Comments */}
                                                <button
                                                    onClick={() =>
                                                        toggleRegistration(reg.Id)
                                                    }
                                                    className="text-gray-500 hover:text-gray-800"
                                                >
                                                    {expandedRegistrations[reg.Id] ? (
                                                        <ChevronDownIcon className="w-5 h-5" />
                                                    ) : (
                                                        <ChevronRightIcon className="w-5 h-5" />
                                                    )}
                                                </button>
                                            </div>

                                            {expandedRegistrations[reg.Id] &&
                                                reg.Comments.length > 0 && (
                                                    <div className="mt-2 pl-4">
                                                        {reg.Comments.map((comment : Comment) => (
                                                            <div
                                                                key={comment.Id}
                                                                className="p-2 bg-gray-50 border rounded-md shadow-sm"
                                                            >
                                                                <p className="text-sm text-gray-800">
                                                                    {comment.CreatedByUserName}:
                                                                </p>
                                                                <p className="text-sm text-gray-600">
                                                                    {comment.Message}
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}