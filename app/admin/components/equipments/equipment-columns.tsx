"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type User = {
//   id: string
    id: string;
    name: string;
    contactno: string;
    isAdmin: boolean;
}

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "Name",  
    },
    {
        accessorKey: "contactno",
        header: "Contact",
    },
    {
        accessorKey: "isAdmin",
        header: "IsAdmin",
    },

]
