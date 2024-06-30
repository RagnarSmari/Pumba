"use client";

import {ColumnDef} from "@tanstack/table-core";
import {Job} from "@/types/jobs";
import {DataTableColumnHeader} from "@/components/data-table/data-table-column-header";
import DataTableActionColumn from "@/components/data-table/data-table-action-column";

export const columns: ColumnDef<Job>[] = [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title='Name' />
            )
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <DataTableActionColumn />
            );
        }
    },
]