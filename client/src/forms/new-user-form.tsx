"use client";
import {z} from "zod";


import {useTranslations} from "next-intl";
import {RoleNameArray, RoleNames, UserRequest, UserRole} from "@/types/users";
import {apiRequest} from "@/services/apiService";
import {HttpStatusCode} from "axios";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Controller, useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {zodResolver} from "@hookform/resolvers/zod";
import UserRoleSelect from "@/components/basic/selects/user-role-select";

export interface JobFormProps{
    AfterSubmit?: () => void;
    OnCancel?: () => void;
}


export default function UserForm({ AfterSubmit, OnCancel} : JobFormProps){
    const t = useTranslations('Users')
    const formSchema = z.object({
        email: z.string().min(1, { message: "Email required"})
            .email("This is not a valid email"),
        name: z.string(),
        role: z.nativeEnum(UserRole),
        phoneNumber: z.string().length(7, { message: "Phone number must be 7 digits"}).optional(),
        kennitala: z.string().length(10, { message: "Kennitala must be 10 digits"}).optional(),
        password: z.string()
    })
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            name: "",
            role: UserRole.Undefined,
            phoneNumber: "",
            kennitala: "",
            password: ""
        }
    })
    function parseOptionalInt(value?: string) {
        return value ? parseInt(value) : undefined;
    }
    async function onSubmit(data: z.infer<typeof formSchema>){
        const newUser: UserRequest = {
            Name: data.name,
            Role: data.role,
            Email: data.email,
            PhoneNumber: parseOptionalInt(data.phoneNumber),
            Kennitala: parseOptionalInt(data.kennitala),
            Password: data.password
        };
        
        try {
            var res = await apiRequest('POST', '/user/', newUser);
            if (res.status === HttpStatusCode.Created){
                alert("User created successfully");
                if (AfterSubmit){
                    AfterSubmit()
                }
            }else{
                alert("Failed to create user: " + res.error)
            }
        } catch (error){
            alert("An error occured" + error)
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
                            <FormMessage/>
                        </FormItem>
                    )}/>
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="grid gap-0">
                            <FormLabel htmlFor="password">{t('Password')}</FormLabel>
                            <FormControl>
                                <Input placeholder={t('Password')} {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
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
                    name="role"
                    render={({ field }) => (
                        <FormItem className="grid gap-0">
                            <FormLabel htmlFor="role">{t('Role')}</FormLabel>
                            <FormControl>
                                <Controller
                                control={form.control}
                                name="role"
                                render={({ field: { onChange, value } }) =>(
                                    <UserRoleSelect
                                    role={value}
                                    onChange={onChange}/>
                                )}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>

                <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                        <FormItem className="grid gap-0">
                            <FormLabel htmlFor="phoneNumber">{t('PhoneNumber')}</FormLabel>
                            <FormControl>
                                <Input placeholder={t('PhoneNumber')} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="kennitala"
                    render={({ field }) => (
                        <FormItem className="grid gap-0">
                            <FormLabel htmlFor="kennitala">{t('Kennitala')}</FormLabel>
                            <FormControl>
                                <Input placeholder={t('Kennitala')} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-between py-3">
                    {/*<Button variant="outline" onClick={onCancel}>{t('Cancel')}</Button>*/}
                    <Button type="submit">{t('Submit')}</Button>
                </div>
            </form>
        </Form>
    )
    
}