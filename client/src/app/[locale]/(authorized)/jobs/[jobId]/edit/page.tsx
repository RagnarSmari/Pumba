"use client"
import JobForm from "@/forms/job-form";
import {useRouter} from "@/i18n/routing";
import {useParams} from "next/navigation";


export default function EditJobPage() {
    const params = useParams<{ jobId: string}>()
    const router = useRouter()
    const jobId = Number(params.jobId)
    
    const goBack = () => {
        router.push("/jobs")
    }
    return (
        <div className={"container mx-auto pt-4"}>
            <JobForm EditMode={true} JobId={jobId}  OnCancel={goBack} AfterSubmit={goBack}/>
        </div>
    )
}