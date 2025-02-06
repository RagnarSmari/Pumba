"use client";

import {ColumnDef} from "@tanstack/table-core";
import {Job} from "@/types/jobs";
import {DataTableColumnHeader} from "@/components/data-table/data-table-column-header";
import DataTableActionColumn from "@/components/data-table/data-table-action-column";

export const getColumns = () : ColumnDef<Job>[] => {
    return columns;
}

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
        cell: ({ row}) => {
            
            return (
                <DataTableActionColumn 
                    OnEditHref={`/jobs/${row.original.Id}/edit`} 
                />
            );
        }
    },
]