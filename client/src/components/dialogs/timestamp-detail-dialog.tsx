import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {DialogClose} from "@radix-ui/react-dialog";


type TimestampDetailDialogProps = {
    trigger?: React.ReactNode,
    id: number
    isOpen: boolean
    onOpenChange: (value: (((prevState: boolean) => boolean) | boolean)) => void
}


export default function TimestampDetailDialog({ trigger, id, isOpen, onOpenChange } : TimestampDetailDialogProps){
    
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Timestamp {id}</DialogTitle>
                    <DialogDescription>
                        Timestamp detailed view
                    </DialogDescription>
                </DialogHeader>
                Here will come some detailed view about this timestamp such as comments \n
                Time from and to. 
                Which user it belongs to, which job it belongs to
                And all the comments on this particular timestamp
                Users will be able to comment on their own timestamp and also their bosses
                Users will be able to delete and edit their comments
                Only admins/bosses will be able to change which job this timestamp belongs to
                
            </DialogContent>
            <DialogClose />
        </Dialog>
    )
} 