"use client";

import {useTranslations} from "next-intl";
import {useRouter} from "@/navigation";
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
import {CreateJobAction} from "@/actions/job-actions";
import ToastAlert from "@/components/basic/toast-alert";

export interface JobFormProps {
    AfterSubmit?: () => void;
    OnCancel?: () => void;
}

export default function JobForm({AfterSubmit, OnCancel}: JobFormProps ){
    const t = useTranslations('Jobs');
    const router = useRouter();
    const formSchema = z.object({
        name: z.string().min(5, {message: t('NameErrorLength')})
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ""
        },
    })

    async function onSubmit(data: z.infer<typeof formSchema>) {
        try {
            let res = await CreateJobAction(data.name);
            if (!res){
                ToastAlert({Title: t('Error'), Message: t('ErrorCreatingJob')})
                return;
            }
        } catch (error) {
            console.error(error)
        }
    }

    async function onCancel(){
        OnCancel && OnCancel();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="grid gap-0">
                            {/*<FormLabel htmlFor="name">{t('Name')}</FormLabel>*/}
                            <FormControl>
                                <Input placeholder={t('Name')} {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                <div className="flex justify-between py-3">
                    <Button variant="outline" onClick={onCancel}>{t('Cancel')}</Button>
                    <Button type="submit">{t('Submit')}</Button>
                </div>
            </form>
        </Form>
    )
}