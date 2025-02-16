import React, {ReactNode} from "react";
import {ChevronDown, User} from "lucide-react";
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenuButton,
    SidebarMenuItem
} from "../ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";

type ReportItem = {
    Title: string;
    Url: string;
    Icon: ReactNode;
}

const items = [
    { Title: "Workers report", Url: "/", Icon: <User />}
]


export default function ReportsSidebar(){
    return (
        <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup>
                <SidebarGroupLabel asChild>
                    <CollapsibleTrigger>
                        Reports
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                    <SidebarGroupContent>
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
                    </SidebarGroupContent>
                </CollapsibleContent>
            </SidebarGroup>
        </Collapsible>
    )
}