import {Button} from "@/components/ui/button";
import PumbaDataTable from "@/components/data-table/pumba-data-table";
import {columns} from "@/app/[locale]/(authorized)/jobs/columns";
import FormDialog from "@/components/dialogs/form-dialog";
import JobForm from "@/forms/job-form";



export default function Jobs() {
    
    return (
        <div>
            <div>
                <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                    Jobs
                </h2>
            </div>
            <div className="container mx-auto py-10 flex flex-col items-stretch justify-center">
                <div className="flex justify-end py-3">
                    <FormDialog 
                        title="New job"
                        description="Create a new job"
                        form={(
                            <JobForm EditMode={false} JobId={0} />
                        )}
                        trigger={(
                            <Button variant="default">Add</Button>
                        )}/>
                </div>
                <PumbaDataTable 
                    columns={columns}
                    url={"/job/"}
                />
            </div>
        </div>
    );
}


