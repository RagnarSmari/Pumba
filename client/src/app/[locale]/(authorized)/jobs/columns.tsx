"use client";

import {ColumnDef} from "@tanstack/table-core";
import {Job} from "@/types/jobs";
import {DataTableColumnHeader} from "@/components/data-table/data-table-column-header";
import DataTableActionColumn from "@/components/data-table/data-table-action-column";
import JobDialog from "@/components/dialogs/Job-dialog";
import {useState} from "react";
import FormDialog from "@/components/dialogs/form-dialog";
import JobForm from "@/forms/job-form";
import {DropdownMenuItem} from "@/components/ui/dropdown-menu";
import {Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle} from "@/components/ui/dialog";

export const columns: ColumnDef<Job>[] = [
    {
        accessorKey: "Id",
        header: "Id",
    },
    {
        accessorKey: "Name",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title='Name' />
            )
        }
    },
    {
        accessorKey: "JobNr",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title='JobNr' />
            )
        }

    },
    {
        id: "actions",
        cell: ({ row }) => {
            
            return (
                <Dialog>
                    <DataTableActionColumn OnEditCallback={() => { }} OnDeleteCallback={() => {}} />
                    <DialogContent>
                        <DialogTitle>
                            This is the dialog
                        </DialogTitle>
                        <DialogDescription>
                            Here will come some description 
                        </DialogDescription>
                        <p>Here is content</p>
                        <DialogClose />
                    </DialogContent>
                </Dialog>
            );
        }
    },
]