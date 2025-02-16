"use client";

import {ColumnDef} from "@tanstack/table-core";
import {Timestamp} from "@/types/timestamp";
import {DataTableColumnHeader} from "@/components/data-table/data-table-column-header";
import DataTableActionColumn from "@/components/data-table/data-table-action-column";


export const getColumns = (onOpenOverview: (id: number) => void) : ColumnDef<Timestamp>[] => [
    {
        accessorKey: "CreatedAt",
        enableSorting: false,
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Date" />
            )
        },
        cell: ({ row }) => {
            const date = new Date(row.original.CreatedAt);
            return new Intl.DateTimeFormat("default", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false, // 24-hour format
            }).format(date);
        }
    },
    {
        accessorKey: "TotalHours",
        enableSorting: false,
        header: ({ column }) => {
            return (
                <DataTableColumnHeader  column={column} title="Hours" />
            )
        }
    },
    {

        accessorKey: "TotalMinutes",
        enableSorting: false,
        header: ({ column }) => {
            return (
                <DataTableColumnHeader  column={column} title="Minutes" />
            )
        }
    },
    {
        accessorKey: "JobName",
        enableColumnFilter: true,
        enableGlobalFilter: true,
        enableSorting: false,
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Job" />
            )
        }
    },
    {
        accessorKey: "UserName",
        enableSorting: false,
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="User" />
            )
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const openOverview = () => {
                onOpenOverview(row.original.Id)
            }
            
            return (
                <DataTableActionColumn OnOverviewCallback={openOverview}  />
            );
        }
    },
]