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
import {useToast} from "@/components/ui/use-toast";
import {ApiResponse} from "@/types/common";
import {auth} from "@/lib/firebaseConfig";
import {pumbaApiRequest} from "@/services/apiService";
import {LocalStorageUSer} from "@/types/auth";


type LoginResponse = {
    IdToken: string;
    CsrfToken: string;
}

export default function LoginForm(){
    const t = useTranslations('LoginForm');
    const toast = useToast(); 
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
        try {
            const res = await auth.signInWithEmailAndPassword(data.email, data.password);
            const user = res.user;
            const token = await user?.getIdToken()
            if (!token) {
                toast.toast({
                    title: 'Uh oh! Something went wrong',
                    description: 'Could not retrieve the id token',
                    variant: 'destructive'
                })
                return
            }
            const loginBody : LoginResponse = {
                IdToken: token,
                CsrfToken: token
            }
            const sessionRes = await pumbaApiRequest<LocalStorageUser>("POST", '/session/new', loginBody)
            if (sessionResJson.error){
                toast.toast({
                    title: 'Uh oh! Something went wrong',
                    description: sessionResJson.error,
                    variant: 'destructive'
                })
                return
            }
            // Insert email to local storage
            localStorage.setItem('user', sessionRes)
            
            router.push('/dashboard');
            
        } catch (e) {
            toast.toast({
                title: 'Uh oh! Something went wrong',
                description: `${e}`,
                variant: 'destructive'
            })
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