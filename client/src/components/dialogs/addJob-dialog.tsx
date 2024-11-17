"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import JobForm from "@/forms/new-job-form";
import React from "react";
import {useTranslations} from "next-intl";
import {DialogClose} from "@radix-ui/react-dialog";

type AddJobDialogProps = {
    trigger: React.ReactNode;
}
export default function AddJobDialog({ trigger } : AddJobDialogProps ){
    const [isOpen, setIsOpen] = React.useState(false);
    const t = useTranslations('Jobs')
    const closeDialog = () => {
        setIsOpen(false);
    }
   return (
       <Dialog open={isOpen} onOpenChange={setIsOpen}>
           <DialogTrigger asChild>
               {trigger}
           </DialogTrigger>
           <DialogContent>
               <DialogHeader>
                   <DialogTitle>{t('NewJob')}</DialogTitle>
                   <DialogDescription>
                       {t('CreateNewJob')}
                   </DialogDescription>
               </DialogHeader>
               <JobForm OnCancel={closeDialog} AfterSubmit={closeDialog}/>
           </DialogContent>
           <DialogClose />
       </Dialog>
   )
}