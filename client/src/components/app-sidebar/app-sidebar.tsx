import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu,
    SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import {Calendar, Home, Inbox, Search, Settings, User} from "lucide-react"
import React, {ReactNode} from "react";
import ReportsSidebar from "@/components/app-sidebar/reports-sidebar";


type MenuItem = {
    Title: string;
    Url: string;
    Icon: ReactNode;
}

const items = [
  { Title: "Dashboard", Url: "/", Icon: <Home/> },
  { Title: "Jobs", Url: "/jobs", Icon: <User /> },
  { Title: "Registrations", Url: "/registrations", Icon: <Settings /> },
] as MenuItem[]


export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>PUMBA </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.Title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.Url}>
                                            {item.Icon}
                                            <span>{item.Title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                        <ReportsSidebar />
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar> 
    )
}
