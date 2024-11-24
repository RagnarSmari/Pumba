import PumbaDataTable from "@/components/data-table/pumba-data-table";
import {columns} from "@/app/[locale]/(authorized)/registrations/columns";
import {Button} from "@/components/ui/button";
import AddRegistrationDialog from "@/components/dialogs/addRegistration-dialog";


export default function Registrations(){
    return (
        <div>
            <div>
                <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                    Skráningar
                </h2>
            </div>
            <div className="container mx-auto py-10 flex flex-col items-stretch justify-center">
                <div className="flex justify-end py-3">
                    <AddRegistrationDialog trigger={(
                        <Button variant="default">Add</Button>
                    )}/>
                </div>
                <PumbaDataTable
                    url={"/timestamp/"}
                    columns={columns}/>
            </div>
        </div>
    );
}