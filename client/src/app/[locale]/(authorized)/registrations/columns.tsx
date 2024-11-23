"use client";

import {ColumnDef} from "@tanstack/table-core";
import {Timestamp} from "@/types/timestamp";
import {DataTableColumnHeader} from "@/components/data-table/data-table-column-header";
import DataTableActionColumn from "@/components/data-table/data-table-action-column";

export const columns: ColumnDef<Timestamp>[] = [
    {
        accessorKey: "Id",
        header: "Id"
    },
    {
        accessorKey: "TotalHours",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader  column={column} title="Hours" />
            )
        }
    },
    {
        accessorKey: "JobName",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Job" />
            )
        }
    },
    {
        accessorKey: "UserName",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="User" />
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