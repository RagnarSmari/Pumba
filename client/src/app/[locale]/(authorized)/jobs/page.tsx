import AddJobDialog from "@/components/dialogs/addJob-dialog";
import {Button} from "@/components/ui/button";
import JobsDataTable from "@/app/[locale]/(authorized)/jobs/JobsDataTable";



export default function Jobs() {
    return (
        <div>
            <div>
                <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                    Title
                </h2>
            </div>
            <div className="container mx-auto py-10 flex flex-col items-stretch justify-center">
                <div className="flex justify-end py-3">
                    <AddJobDialog trigger={(
                        <Button variant="default">Add</Button>
                    )}/>
                </div>
                <JobsDataTable/>
            </div>
        </div>
    );
}