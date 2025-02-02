"use client"

import React from "react";
import {Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription, DialogClose} from "@/components/ui/dialog";


export type FormDialogProps = {
    title: string;
    description: string;
    form: React.ReactNode;
    trigger: React.ReactNode;
}

export default function FormDialog(props: FormDialogProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {props.trigger}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {props.title}
                    </DialogTitle>
                    <DialogDescription>
                        {props.description}
                    </DialogDescription>
                </DialogHeader>
                {props.form}
            </DialogContent>
            <DialogClose />
        </Dialog>
    )
}