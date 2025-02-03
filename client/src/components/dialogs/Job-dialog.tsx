"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import JobForm from "@/forms/job-form";
import React from "react";
import {useTranslations} from "next-intl";
import {DialogClose} from "@radix-ui/react-dialog";
import {useToast} from "@/components/ui/use-toast";

type AddJobDialogProps = {
    trigger?: React.ReactNode;
    editMode: boolean;
    jobId: number;
}
export default function JobDialog({ trigger, editMode, jobId } : AddJobDialogProps ){
    const [isOpen, setIsOpen] = React.useState(false);
    const toast = useToast();
    const t = useTranslations('Jobs')
    const closeDialog = () => {
        const toastTitle = "Success!";
        let toastDescription = "Job created successfully";
        if (editMode && jobId !== 0){
            toastDescription = "Job updated successfully";
        }
        toast.toast({
            title: toastTitle,
            description: toastDescription,
        });
        setIsOpen(false);
    }
    console.log("isopen", isOpen);
    console.log("editmode", editMode);
    console.log("jobid", jobId);
   return (
       <Dialog open={isOpen} onOpenChange={setIsOpen}>
           <DialogTrigger asChild>
               {trigger}
           </DialogTrigger>
           <DialogContent>
               <DialogHeader>
                   <DialogTitle>
                       {editMode && jobId !== 0 ? t('EditJob') : t('NewJob')}
                   </DialogTitle>
                   <DialogDescription>
                       {editMode && jobId !== 0 ? t('EditJobDescription') : t('CreateNewJob')}
                   </DialogDescription>
               </DialogHeader>
               <JobForm OnCancel={closeDialog} AfterSubmit={closeDialog} EditMode={editMode} JobId={jobId}/>
           </DialogContent>
           <DialogClose />
       </Dialog>
   )
}