"use client"
import JobForm from "@/forms/job-form";
import {useRouter} from "@/i18n/routing";
import {useParams} from "next/navigation";
import {useToast} from "@/components/ui/use-toast";


export default function EditJobPage() {
    const params = useParams<{ jobId: string}>()
    const router = useRouter()
    const toast = useToast()
    const jobId = Number(params.jobId)
    
    const goBack = () => {
        router.push("/jobs")
    }
    const onSubmit = () => {
        toast.toast({
            title: "Successfully updated!",
            description: "Job was successfully updated",
        })
        goBack()
    }
    return (
        <div className={"container mx-auto pt-4"}>
            <JobForm EditMode={true} JobId={jobId}  OnCancel={goBack} AfterSubmit={onSubmit}/>
        </div>
    )
}