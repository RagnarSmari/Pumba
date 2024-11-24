"use client"
import React from "react";
import {useTranslations} from "next-intl";
import {Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import NewRegistrationForm from "@/forms/new-registration.form";


type AddRegistrationProps = {
    trigger: React.ReactNode;
}

export default function AddRegistrationDialog({ trigger } : AddRegistrationProps){
    const [isOpen, setIsOpen] = React.useState(false);
    const t = useTranslations('Registrations')
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
                   <DialogTitle>{t('NewRegistration')}</DialogTitle>
                   <DialogDescription>
                       {t('CreateNewRegistration')}
                   </DialogDescription>
               </DialogHeader>
               <NewRegistrationForm OnCancel={closeDialog} AfterSubmit={closeDialog}/>
           </DialogContent>
           <DialogClose />
       </Dialog>
    )
}