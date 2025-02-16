import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/app-sidebar/app-sidebar";
import {Separator} from "@/components/ui/separator";
import LayoutBreadCrumbs from "@/components/layout-breadcrumbs";

type LayoutProps = {
    children: React.ReactNode;
};

export default function MainLayout({ children }: LayoutProps) {
        
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1"/>
                    <Separator orientation="vertical" className="mr-2 h-4"/>
                    <LayoutBreadCrumbs/>
                </header>
                <main className="w-full max-w-(--breakpoint-2xl) mx-auto px-4 pt-4">
                    {/*<SidebarTrigger />*/}
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
