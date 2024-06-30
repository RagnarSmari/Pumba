import {GetAllJobs} from "@/services/jobs/jobsService";
import {getTranslations} from "next-intl/server";
import {DataTable} from "@/components/data-table/data-table";
import {columns} from "@/app/[locale]/(authorized)/jobs/columns";
import AddJobDialog from "@/components/dialogs/addJob-dialog";
import {Button} from "@/components/ui/button";
import React from "react";



export default async function Jobs() {
    const t = await getTranslations('Jobs');
    let jobs = await GetAllJobs();
    return (
        <div>
            <div>
                <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                    {t('title')}
                </h2>
            </div>
            <div className="container mx-auto py-10 flex flex-col items-stretch justify-center">
                <div className="flex justify-end py-3">
                    <AddJobDialog trigger={(
                        <Button variant="default">{t('Add')}</Button>
                    )}/>
                </div>
                <DataTable columns={columns} data={jobs}/>
            </div>
        </div>
    );
}