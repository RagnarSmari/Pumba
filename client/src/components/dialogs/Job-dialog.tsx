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
import {useToast} from "@/components/ui/use-toast";

type AddJobDialogProps = {
    trigger?: React.ReactNode;
    editMode: boolean;
    jobId: number;
}
export default function JobDialog({ trigger, editMode, jobId } : AddJobDialogProps ){
    const [isOpen, setIsOpen] = React.useState(false);
    const toast = useToast();
    // const t = useTranslations('Jobs')
    const closeDialog = () => {
        setIsOpen(false);
    }
    const handleSubmit = () => {
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
   return (
       <Dialog open={isOpen} onOpenChange={setIsOpen}>
           <DialogTrigger asChild>
               {trigger}
           </DialogTrigger>
           <DialogContent>
               <DialogHeader>
                   <DialogTitle>
                       {editMode && jobId !== 0 ? "Edit job" : "New job"}
                   </DialogTitle>
                   <DialogDescription>
                       {editMode && jobId !== 0 ? "Edit job description" : "Create new job description"}
                   </DialogDescription>
               </DialogHeader>
               <JobForm OnCancel={closeDialog} AfterSubmit={handleSubmit} EditMode={editMode} JobId={jobId}/>
           </DialogContent>
       </Dialog>
   )
}