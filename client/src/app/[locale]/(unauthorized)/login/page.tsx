import {useTranslations} from "next-intl";
import LoginForm from "@/forms/login-form";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Login(){
    const t = useTranslations('LoginForm');

    return (
        <div className="w-full h-screen lg:grid lg:grid-cols-2">
            <div className="h-full flex items-center justify-center">
                <div className="md:w-1/2 sm:w-full">
                    <div className="py-4">
                        <div className="grid gap-2 text-center">
                            <h1 className="text-3xl font-bold">
                                {t('title')}
                            </h1>
                            <p className="text-balance text-muted-foreground">
                                {t('EnterEmailToLogin')}
                            </p>
                        </div>
                    </div>
                    <LoginForm/>
                    <div className="py-4">
                        <Button variant="outline" className="w-full py-4">
                            {t('LoginWithGoogle')}
                        </Button>
                        <div className="flex items-center p-2">
                            <Link
                                href="/forgot-password"
                                className="ml-auto inline-block text-sm underline"
                            >
                                {t('ForgotPassword')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden lg:block relative h-full bg-muted">
                <Image
                    src="/pumba.jpg"
                    alt="Image"
                    layout="fill" // Use the layout="fill" property to make the image fill its parent container
                    className="object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}