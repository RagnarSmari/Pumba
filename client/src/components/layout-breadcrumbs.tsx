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
                           <div key={idx} className={"flex items-center space-x-2"}>
                               {idx > 0 && (
                                   <BreadcrumbSeparator />
                               )}
                               <BreadcrumbItem className="hidden md:block" key={idx}>
                                   <BreadcrumbLink >
                                       {val.charAt(0).toUpperCase() + String(val).slice(1)}
                                   </BreadcrumbLink>
                               </BreadcrumbItem>
                           </div>
                       )
                   }
               )}
           </BreadcrumbList>
       </Breadcrumb>
   )
}