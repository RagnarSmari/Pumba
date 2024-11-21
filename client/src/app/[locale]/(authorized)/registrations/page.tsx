import PumbaDataTable from "@/components/data-table/pumba-data-table";
import {columns} from "@/app/[locale]/(authorized)/registrations/columns";


export default function Registrations(){
    return (
        <div>
            <div>
                <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                    Stimplanir
                </h2>
            </div>
            <PumbaDataTable
                url={"/timestamp/"}
                columns={columns}/>
        </div>
    );
}