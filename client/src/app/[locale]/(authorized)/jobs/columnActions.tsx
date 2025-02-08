"use client";

import React, {useState} from "react";
import JobForm from "@/forms/job-form";
import {Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle} from "@/components/ui/dialog";
import DataTableActionColumn from "@/components/data-table/data-table-action-column";
import {Button} from "@/components/ui/button";
import {pumbaApiRequest} from "@/services/apiService";
import {useToast} from "@/components/ui/use-toast";
import useSWR, { useSWRConfig } from 'swr'

type actionColumnDialogProps = {
    title: string;
    description: string;
    content?: React.ReactNode;
    onSuccessCallback?: () => void;
}

export default function ColumnActions({id}: { id : number}) {

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [dialogProps, setDialogProps] = useState<actionColumnDialogProps>()
    const toast = useToast()
    const { mutate } = useSWRConfig()

    const closeDialog = () => {
        setIsDialogOpen(false)
    }
    const handleSubmit = () => {
        closeDialog();
    }
    
    const handleDeleteJob = () => {
        pumbaApiRequest("DELETE", `/job/${id}`)
            .then(() => {
                setIsDialogOpen(false)
                toast.toast({
                    title: "Successfully deleted!",
                    description: "Job was successfully deleted",
                })
                // TODO
                // Use the current url so that the user goes back to the same place in the table as he was before 
                mutate('http://localhost:8080/api/job/?page=1&pageSize=10')
            })
            .catch(() => {
                console.log("Failed to delete job")
            }
        )
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
    const deleteProps : actionColumnDialogProps = {
        title: `Delete job ${id}`,
        description: "Are you sure you want to delete this job?",
        content: (
            <div className="flex justify-end space-x-2 mt-4">
                <Button variant={"outline"} onClick={() => setIsDialogOpen(false) }>
                    Cancel
                </Button>
                <Button variant={"destructive"} onClick={handleDeleteJob}>
                    Delete
                </Button>
            </div>
        ),
    }

    const onDelete = () => {
        setDialogProps(deleteProps)
        setIsDialogOpen(true)
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
            <DataTableActionColumn
                OnEditHref={`/jobs/${id}/edit`}
                OnDeleteCallback={onDelete}
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

