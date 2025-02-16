"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {Job} from "@/types/jobs";

const chartData: Job[] & { fill: string }[] = [
    { Id: 1, Name: "Web Development", JobNr: 101, TotalHours: 320, fill: "hsl(var(--chart-1))" },
    { Id: 2, Name: "Mobile App Design", JobNr: 102, TotalHours: 240, fill: "hsl(var(--chart-2))" },
    { Id: 3, Name: "Database Optimization", JobNr: 103, TotalHours: 180, fill: "hsl(var(--chart-3))" },
    { Id: 4, Name: "Cloud Migration", JobNr: 104, TotalHours: 220, fill: "hsl(var(--chart-4))" },
    { Id: 5, Name: "Software Testing", JobNr: 105, TotalHours: 150, fill: "hsl(var(--chart-5))" },
];


const chartConfig = {
    WebDevelopment: {
        label: "Web Development",
        color: "hsl(var(--chart-1))",
    },
    MobileAppDesign: {
        label: "Mobile App Design",
        color: "hsl(var(--chart-2))",
    },
    DatabaseOptimization: {
        label: "Database Optimization",
        color: "hsl(var(--chart-3))",
    },
    CloudMigration: {
        label: "Cloud Migration",
        color: "hsl(var(--chart-4))",
    },
    SoftwareTesting: {
        label: "Software Testing",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig;

export default function TotalHoursPerJobChart() {
    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Pie Chart - Label</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
                >
                    <PieChart>
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <Pie data={chartData} dataKey="TotalHours" label nameKey="Name" />
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="leading-none text-muted-foreground">
                   Showing total hours per job last 6 months 
                </div>
            </CardFooter>
        </Card>
    )
}
