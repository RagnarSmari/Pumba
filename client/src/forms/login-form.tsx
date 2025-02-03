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
import {toast} from "@/components/ui/use-toast";
import {ApiResponse} from "@/types/common";


type LoginResponse = {
    IdToken: string;
    CsrfToken: string;
}

export default function LoginForm(){
    const t = useTranslations('LoginForm');
    const apiURL = process.env.NEXT_PUBLIC_PUMBA_API_URL;
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
        const res = await LoginWithEmailAction(data.email, data.password);
        if (!res) {
            toast({
                title: 'Uh oh! Something went wrong',
                description: res,
                variant: 'destructive'
            })
            return;
        }
        
        const loginBody : LoginResponse = {
            IdToken: res,
            CsrfToken: res
        }
        const sessionRes = await fetch(apiURL + '/session/new',{
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(loginBody) 
        })
        const sessionResJson = await sessionRes.json() as ApiResponse<string>
        if (sessionResJson.error){
            toast({
                title: 'Uh oh! Something went wrong',
                description: sessionResJson.error,
                variant: 'destructive'
            })
            return
        }
        router.push('/dashboard');
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
                        <FormItem className="grid gap-2">
                            <div className="flex items-center">
                                <FormLabel htmlFor="password">{t('Password')}</FormLabel>
                                <a
                                    href="#"
                                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                >
                                    Forgot your password?
                                </a>
                            </div>
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