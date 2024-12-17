import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/app-sidebar/app-sidebar";

type LayoutProps = {
    children: React.ReactNode;
};

export default function MainLayout({ children }: LayoutProps) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full max-w-screen-2xl mx-auto px-4 pt-4">
                {/*<SidebarTrigger />*/}
                {children}
            </main>
        </SidebarProvider>
    );
}
