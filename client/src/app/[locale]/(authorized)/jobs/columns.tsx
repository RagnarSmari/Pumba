"use client";

import {ColumnDef} from "@tanstack/table-core";
import {Job} from "@/types/jobs";
import {DataTableColumnHeader} from "@/components/data-table/data-table-column-header";
import ColumnActions from "@/app/[locale]/(authorized)/jobs/columnActions";


export const columns: ColumnDef<Job>[] = [
    {
        accessorKey: "Id",
        sortDescFirst: true,
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Id' />
        )
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
        cell: ({ row, table }) => {
            const  state  = table.getState();
            return (
                <ColumnActions id={row.original.Id} tableState={state} />
            );
        }
    },
]