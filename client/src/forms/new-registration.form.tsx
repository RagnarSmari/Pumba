"use client";
import {useTranslations} from "next-intl";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {apiRequest} from "@/services/apiService";
import {HttpStatusCode} from "axios";
import ToastAlert from "@/components/basic/toast-alert";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


export interface NewRegistrationFormProps {
    AfterSubmit?: () => void;
    OnCancel?: () => void;
}


export default function JobForm({ AfterSubmit, OnCancel} : NewRegistrationFormProps ){
    const t = useTranslations('Registrations')
    const formSchema = z.object({
        hours: z.coerce.number(),
        jobId: z.coerce.number(),
    })
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            hours: 0,
            jobId: 0
        },
    })
    
    async function onSubmit(data: z.infer<typeof formSchema>) {
        try {
            var res = await apiRequest('POST', '/timestamp/', { totalHours: data.hours, jobId: data.jobId });
            if(res.status == HttpStatusCode.Created){
                if (AfterSubmit){
                    AfterSubmit()
                }
            }
        }catch (error){
            console.error(error)
            ToastAlert({ Title: 'Error', Message: 'Error'});
        }
    }
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                <FormField
                    control={form.control}
                    name="hours"
                    render={({ field }) => (
                        <FormItem className="grid gap-0">
                            <FormLabel htmlFor="name">{t('Hours')}</FormLabel>
                            <FormControl>
                                <Input placeholder={t('Hours')} {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>               
                <FormField
                    control={form.control}
                    name="jobId"
                       render={({ field }) => (
                        <FormItem className="grid gap-0">
                            <FormLabel htmlFor="jobId">{t('JobId')}</FormLabel>
                            <FormControl>
                                <Input placeholder={t('JobId')} {...field}/>
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