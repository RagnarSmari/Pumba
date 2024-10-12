"use client";
import {z} from "zod";
import {useTranslations} from "next-intl";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import {useRouter} from "next/navigation";
import {LoginWithEmailAction} from "@/actions/auth-actions";

export default function LoginForm(){
    const t = useTranslations('LoginForm');
    const router = useRouter();
    const formSchema = z.object({
        email: z.string().email(),
        password: z.string()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    async function onSubmit(data: z.infer<typeof formSchema>){
        try {
            let res = await LoginWithEmailAction(data.email, data.password);
            if (!res) return; // TODO show error message
            console.log("rerouting")
            router.push("/dashboard")
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="grid gap-0">
                            <FormLabel htmlFor="email">{t('Email')}</FormLabel>
                            <FormControl>
                                <Input placeholder={t('Email')} {...field}/>
                            </FormControl>
                        </FormItem>
                    )}/>
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="grid gap-0">
                            <FormLabel htmlFor="password">{t('Password')}</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder={t('Password')} {...field}/>
                            </FormControl>
                        </FormItem>
                    )}/>
                <Button type="submit" className="w-full">{t('Submit')}</Button>
            </form>
        </Form>
    );
}