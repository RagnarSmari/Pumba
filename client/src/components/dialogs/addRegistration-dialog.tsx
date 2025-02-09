"use client"
import React from "react";
import {Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import NewRegistrationForm from "@/forms/new-registration.form";


type AddRegistrationProps = {
    trigger: React.ReactNode;
}

export default function AddRegistrationDialog({ trigger } : AddRegistrationProps){
    const [isOpen, setIsOpen] = React.useState(false);
    const closeDialog = () => {
        setIsOpen(false);
    }
    
    return(
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
           <DialogTrigger asChild>
               {trigger}
           </DialogTrigger>
           <DialogContent>
               <DialogHeader>
                   <DialogTitle>New registration</DialogTitle>
                   <DialogDescription>
                       Create new registration
                   </DialogDescription>
               </DialogHeader>
               <NewRegistrationForm OnCancel={closeDialog} AfterSubmit={closeDialog}/>
           </DialogContent>
           <DialogClose />
       </Dialog>
    )
}