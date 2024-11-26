"use client";
import React from "react";
import {useTranslations} from "next-intl";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {DialogClose} from "@radix-ui/react-dialog";
import UserForm from "@/forms/new-user-form";


type AddUserDialogProps = {
    trigger: React.ReactNode
}

export default function AddUserDialog({ trigger } : AddUserDialogProps){

    const [isOpen, setIsOpen] = React.useState(false);
    const t = useTranslations('Users')
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
                    <DialogTitle>{t('NewUser')}</DialogTitle>
                    <DialogDescription>
                        {t('CreateNewUser')}
                    </DialogDescription>
                </DialogHeader>
                <UserForm OnCancel={closeDialog} AfterSubmit={closeDialog}/>
            </DialogContent>
            <DialogClose />
        </Dialog>
    )
} 