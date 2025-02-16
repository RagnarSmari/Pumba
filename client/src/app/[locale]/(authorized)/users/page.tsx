import PumbaDataTable from "@/components/data-table/pumba-data-table";
import {columns} from "@/app/[locale]/(authorized)/users/columns";
import AddUserDialog from "@/components/dialogs/addUser-dialog";
import {Button} from "@/components/ui/button";



export default function Jobs() {
    return (
        <div>
            <div>
                <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                    Notendur 
                </h2>
            </div>
            <div className="container mx-auto py-10 flex flex-col items-stretch justify-center">
                <div className="flex justify-end py-3">
                    <AddUserDialog trigger={(
                        <Button variant="default">Add</Button>
                    )}/>
                </div>
                <PumbaDataTable
                    url={"/user/"}
                    columns={columns}/>
            </div>
        </div>
    );
}