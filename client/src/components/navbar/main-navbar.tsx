import {
    Package2, Plus,
} from "lucide-react"

import { Link } from "@/i18n/routing"
import {Button} from "@/components/ui/button";
import AddRegistrationDialog from "@/components/dialogs/addRegistration-dialog";


export default function MainNavbar(){
    return (
        <header className="flex w-full flex-col ">
            <div className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 justify-between">
                <nav
                    className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <Link href="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
                        <Package2 className="h-6 w-6"/>
                        <span className="sr-only">Acme Inc</span>
                    </Link>
                    <Link href="/dashboard" className="text-foreground transition-colors hover:text-foreground">
                        Dashboard
                    </Link>
                    <Link href="/jobs" className="text-muted-foreground transition-colors hover:text-foreground">
                        Jobs
                    </Link>
                    <Link href="/registrations" className="text-muted-foreground transition-colors hover:text-foreground">
                        Registrations
                    </Link>
                    <Link href="/users" className="text-muted-foreground transition-colors hover:text-foreground">
                        Users
                    </Link>
                </nav>
                <div>
                    <AddRegistrationDialog trigger={(
                        <Button variant="default">
                            <Plus/>
                        </Button>
                    )}/>
                </div>
            </div>
        </header>
    );
}