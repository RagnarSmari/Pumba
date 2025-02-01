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
import {apiRequest, postApiRequest} from "@/services/apiService";
import {useRouter} from "@/i18n/routing";
import {HttpStatusCode} from "axios";

export interface JobFormProps {
    AfterSubmit?: () => void;
    OnCancel?: () => void;
}

export default function JobForm({AfterSubmit, OnCancel}: JobFormProps ){
    const t = useTranslations('Jobs');
    const router = useRouter();
    const formSchema = z.object({
        name: z.string().min(5, {message: 'Name error'}),
        jobNr: z.coerce.number().min(1, {message: 'Number error'})
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            jobNr: 0
        },
    })

    async function onSubmit(data: z.infer<typeof formSchema>) {
        try {
            console.log("submitting form")
            var res = await postApiRequest('/job/', { name: data.name, jobNr: data.jobNr });            
            console.log(res)
            if(res.status == HttpStatusCode.Created){
                if (AfterSubmit){
                    AfterSubmit()
                }
            }
            
        } catch (error) {
            console.error(error)
            ToastAlert({ Title: 'Error', Message: 'Error'});
        }
    }

    async function onCancel(){
        if(OnCancel != undefined) {
            OnCancel();
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="grid gap-0">
                            <FormLabel htmlFor="name">{t('Name')}</FormLabel>
                            <FormControl>
                                <Input placeholder={t('Name')} {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>               
                <FormField
                    control={form.control}
                    name="jobNr"
                       render={({ field }) => (
                        <FormItem className="grid gap-0">
                            <FormLabel htmlFor="jobNr">{t('JobNr')}</FormLabel>
                            <FormControl>
                                <Input placeholder={t('JobNr')} {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                <div className="flex justify-between py-3">
                    {/*<Button variant="outline" onClick={onCancel}>{t('Cancel')}</Button>*/}
                    <Button type="submit">{t('Submit')}</Button>
                </div>
            </form>
        </Form>
    )
}