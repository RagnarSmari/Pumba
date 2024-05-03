import {DateRangePicker} from "@/components/ui/date-range-picker.tsx";

function Dashboard() {
  return (
    <div className={"grid"}>
        <div className={"flex justify-between py-8"}>
            <h2 className="scroll-m-20 px-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                Dashboard
            </h2>
            <div className={"text-center"}>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                   Time period
                </p>
                    <DateRangePicker
                        onUpdate={(values) => console.log(values)}
                        initialDateFrom="2023-01-01"
                        initialDateTo="2023-12-31"
                        align="start"
                        locale="en-GB"
                        showCompare={false}
                    />
            </div>
            
        </div>
    </div>
  );
}

export default Dashboard;