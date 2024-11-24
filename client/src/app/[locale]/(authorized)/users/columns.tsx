"use client";

import {ColumnDef} from "@tanstack/table-core";
import {User, UserRole} from "@/types/users";

const roleNames = {
    [UserRole.Admin]: "Admin",
    [UserRole.Owner]: "Owner",
    [UserRole.Worker]: "Worker",
};

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "Name",
        header: "Name",
    },
    {
        accessorKey: "Role",
        header: "Role",
        cell: info => roleNames[info.getValue() as UserRole] ?? "Unknown role",
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
    }
]