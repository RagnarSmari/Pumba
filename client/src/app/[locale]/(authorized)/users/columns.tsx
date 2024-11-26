"use client";

import {ColumnDef} from "@tanstack/table-core";
import {RoleNames, User, UserRole} from "@/types/users";


export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "Role",
        header: "Role",
        cell: ({ row }) => RoleNames[row.original.Role],
    },
    {
        accessorKey: "Email",
        header: "Email"
    },
]