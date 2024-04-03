import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from 'zod'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Login } from "@/services/auth/auth"
import { useNavigate } from "react-router-dom"
import { useState } from "react"



const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, {
        message: 'Password must be at least 8 characters long'
    }),
})


export default function LoginForm() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })
    
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true);
        try {
            const res = await Login(values.email, values.password);
            console.log(res);
            navigate("/dashboard"); // Redirect on successful login
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false); // Ensure we reset the submitting state
        }
    };


    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input disabled={isSubmitting} placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input disabled={isSubmitting} type="password" {...field} />
                </FormControl>
                </FormItem>
            )}/>
            <Button className="w-full" disabled={isSubmitting} type="submit">Login</Button>
        </form>
      </Form>
    )
}