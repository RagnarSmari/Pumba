import RealTimeClock from "@/components/real-time-clock/real-time-clock";
import {Button} from "@/components/ui/button";
import TotalHoursPerJobChart from "@/components/charts/total-hours-per-job-chart";
import DashboardOverviewInfo from "@/app/[locale]/(authorized)/dashboard/dashboardOverviewInfo";
import LastFiveRegistrations from "@/app/[locale]/(authorized)/dashboard/LastFiveRegistrations";

export default function Dashboard() {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="">
                <RealTimeClock/>
                <div className={"mt-4 w-full"}>
                    <Button className={"w-full"} variant="default">Punch in</Button>
                </div>
            </div>
            <div>
                <DashboardOverviewInfo/>
            </div>
            <div>
                <TotalHoursPerJobChart/>
            </div>
            <div>
                <LastFiveRegistrations />
            </div>
        </div>
    )
}
