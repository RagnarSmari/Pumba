"use client";

import {ColumnDef} from "@tanstack/table-core";
import {RoleNames, User, UserRole} from "@/types/users";


export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "Name",
        header: "Name"
    },
    {
        accessorKey: "Email",
        header: "Email"
    },
    {
        accessorKey: "Kennitala",
        header: "Kennitala"
    },
    {
        accessorKey: "PhoneNumber",
        header: "PhoneNumber"
    },
    {
        accessorKey: "Role",
        header: "Role",
        cell: ({ row }) => RoleNames[row.original.Role],
    },
]