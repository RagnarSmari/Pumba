"use client";

import {useTranslations} from "next-intl";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import ToastAlert from "@/components/basic/toast-alert";
import {pumbaApiRequest} from "@/services/apiService";
import {HttpStatusCode} from "axios";
import {ApiResponse} from "@/types/common";
import {useEffect, useState} from "react";
import {Job} from "@/types/jobs";

export interface JobFormProps {
    AfterSubmit?: () => void;
    OnCancel?: () => void;
    EditMode: boolean;
    JobId: number
}

export default function JobForm({AfterSubmit, OnCancel, EditMode, JobId}: JobFormProps ){
    const [job, setJob] = useState<Job>({
        Id: 0,
        Name: "",
        JobNr: 0,
    });
    const [error, setError] = useState("")
    // const t = useTranslations('Jobs');
    const formSchema = z.object({
        name: z.string().min(5, {message: 'Name error'}),
        jobNr: z.coerce.number().min(1, {message: 'Number error'})
    })
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            jobNr: 0
        },
    })
    const cancel = () => {
        if (OnCancel !== undefined){
            OnCancel()
        }
    }
    
    useEffect(() => {
        if(EditMode && JobId){
            setLoading(true)
            pumbaApiRequest('GET', '/job/' + JobId)
                .then((res : ApiResponse<Job>)=> {
                    setJob(res.data)
                    form.reset({
                        name: res.data.Name,
                        jobNr: res.data.JobNr,
                    })
                })
                .catch(err => {
                    console.error(err)
                })
            setLoading(false)
        }

    },[EditMode, JobId])

    async function onSubmit(data: z.infer<typeof formSchema>) {
        try {
            let method : 'POST' | 'PUT' = "POST";
            let url = '/job/';
            if(EditMode && JobId){
                method = "PUT";
                url = '/job/' + JobId;
            }
            setLoading(true)
            const res : ApiResponse<undefined> = await pumbaApiRequest(method, url, { name: data.name, jobNr: data.jobNr });
            if(res.status === HttpStatusCode.Created || res.status === HttpStatusCode.Ok){
                if (AfterSubmit){
                    AfterSubmit()
                }
            }
            setLoading(false)
            if (res.status === HttpStatusCode.BadRequest || res.error !== ""){
                setError(res.error)
            }
            
        } catch (error) {
            console.error(error)
            ToastAlert({ Title: 'Error', Message: 'Error'});
        }
    }

    return (
        <Form {...form}>
            {error !== "" && (
                <p className="text-red-600">Error: {error}</p>
            )}
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="grid gap-0">
                            <FormLabel htmlFor="name">Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Name" {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>               
                <FormField
                    control={form.control}
                    name="jobNr"
                       render={({ field }) => (
                        <FormItem className="grid gap-0">
                            <FormLabel htmlFor="jobNr">Job number</FormLabel>
                            <FormControl>
                                <Input placeholder="Job number" {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                <div className="flex space-x-2">
                    <Button type="submit" disabled={loading} className="btn">Submit</Button>
                    <Button type="button" variant="outline" onClick={cancel} >Cancel</Button>
                </div>
            </form>
        </Form>
    )
}