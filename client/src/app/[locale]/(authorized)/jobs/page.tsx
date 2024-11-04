import {GetAllJobs} from "@/services/jobs/jobsService";
import {getTranslations} from "next-intl/server";
import AddJobDialog from "@/components/dialogs/addJob-dialog";
import {Button} from "@/components/ui/button";
import React from "react";
import JobsDataTable from "@/app/[locale]/(authorized)/jobs/jobsDataTable";



export default async function Jobs() {
    const t = await getTranslations('Jobs');
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
                <JobsDataTable/>
            </div>
        </div>
    );
}