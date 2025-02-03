"use client";

import React, {useRef, useState} from "react";
import JobForm from "@/forms/job-form";
import {Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle} from "@/components/ui/dialog";
import DataTableActionColumn from "@/components/data-table/data-table-action-column";
import useSWR from "swr";

type actionColumnDialogProps = {
    title: string;
    description: string;
    content?: React.ReactNode;
    onSuccessCallback?: () => void;
}

export default function ColumnActions({id, refreshData}: { id : number, refreshData : () => void}) {

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [dialogProps, setDialogProps] = useState<actionColumnDialogProps>()
    const { mutate } = useSWR('/job')

    const closeDialog = () => {
        setIsDialogOpen(false)
    }
    const handleSubmit = () => {
        closeDialog();
        refreshData();
    }

    const onEdit = () => {
        setDialogProps(editProps);
        setIsDialogOpen(true);
    }

    const editProps : actionColumnDialogProps =  {
        title: "Edit job",
        description: "Edit job",
        content: (
            <JobForm EditMode={true} JobId={id}
                     AfterSubmit={handleSubmit} />
        )
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
            <DataTableActionColumn
                OnEditCallback={onEdit}
            />
            <DialogContent>
                <DialogTitle>
                    {dialogProps?.title}
                </DialogTitle>
                <DialogDescription>
                    {dialogProps?.description}
                </DialogDescription>
                <DialogClose/>
                {dialogProps?.content}
            </DialogContent>
        </Dialog>
    )
}

