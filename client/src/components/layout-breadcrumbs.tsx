"use client"


import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {usePathname} from "@/i18n/routing";

export default function LayoutBreadCrumbs() {
    const pathName = usePathname()
    const names = pathName.split("/")
        .filter((x) => x)
    
   return (
       <Breadcrumb>
           <BreadcrumbList>
               {names.map(
                   (val,idx) => {
                       return (
                           <>
                               <BreadcrumbItem className="hidden md:block">
                                   <BreadcrumbLink>
                                       {val.charAt(0).toUpperCase() + String(val).slice(1)}
                                   </BreadcrumbLink>
                               </BreadcrumbItem>
                           </>
                       )
                   }
               )}
           </BreadcrumbList>
       </Breadcrumb>
   )
}