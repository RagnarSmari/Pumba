"use client"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Timestamp} from "@/types/timestamp";

const randomTimestamps: Timestamp[] = [
    new Timestamp(
        1,
        8,                 // TotalHours
        30,                // TotalMinutes
        "Website Redesign", // JobName
        "John Doe",         // UserName
        new Date("2023-11-02T09:15:00"), // CreatedAt
        []                  // Comments
    ),
    new Timestamp(
        2,
        6,
        0,
        "API Development",
        "Jane Smith",
        new Date("2023-11-03T13:45:00"),
        []
    ),
    new Timestamp(
        3,
        10,
        15,
        "UI Improvements",
        "Alice Johnson",
        new Date("2023-11-01T08:00:00"),
        []
    ),
    new Timestamp(
        4,
        7,
        50,
        "Database Migration",
        "Ethan Brown",
        new Date("2023-11-04T16:30:00"),
        []
    ),
    new Timestamp(
        5,
        5,
        20,
        "Performance Testing",
        "Lucas Miller",
        new Date("2023-11-05T11:10:00"),
        []
    ),
];


export default function LastFiveRegistrations(){
    return(
        <Card>
            <CardHeader>
                <CardTitle>A list of your last 5 registrations</CardTitle>
            </CardHeader>
            <CardContent>
               <LastFiveRegistrationsTable /> 
            </CardContent>
        </Card>
    )
    
}

function LastFiveRegistrationsTable() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>CreatedAt</TableHead>
                    <TableHead>Hours</TableHead>
                    <TableHead>Minutes</TableHead>
                    <TableHead className="text-right">Job</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {randomTimestamps.map((invoice) => (
                    <TableRow key={invoice.Id}>
                        <TableCell className="font-medium">{invoice.CreatedAt.toLocaleString()}</TableCell>
                        <TableCell>{invoice.TotalHours}</TableCell>
                        <TableCell>{invoice.TotalMinutes}</TableCell>
                        <TableCell className="text-right">{invoice.JobName}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
