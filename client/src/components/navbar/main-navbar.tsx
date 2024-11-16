import {
    Package2,
} from "lucide-react"

import {useTranslations} from "next-intl";
import { Link } from "@/i18n/routing"


export default function MainNavbar(){
    const t = useTranslations('NavBar');
    return (
        <header className="flex w-full flex-col">
            <div className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <Link href="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
                        <Package2 className="h-6 w-6"/>
                        <span className="sr-only">Acme Inc</span>
                    </Link>
                    <Link href="/dashboard" className="text-foreground transition-colors hover:text-foreground">
                        {t('Dashboard')}
                    </Link>
                    <Link href="/jobs" className="text-muted-foreground transition-colors hover:text-foreground">
                        {t('Jobs')}
                    </Link>
                    <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">
                        {t('TimeRegistrations')}
                    </Link>
                    <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">
                        {t('Users')}
                    </Link>
                </nav>
                {/*<div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    <form className="ml-auto flex-1 sm:flex-initial">
                    </form>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                <CircleUser className="h-5 w-5"/>
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>*/}
            </div>
        </header>
    );
}