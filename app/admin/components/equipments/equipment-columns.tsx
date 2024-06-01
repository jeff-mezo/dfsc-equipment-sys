"use client"

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react";
import { deleteEquipment, verifyUser } from "../../actions/index";
import { Router } from "next/router";
import { profile } from "console";


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Equipment = {
//   id: string
    eq_id: string;
    id: number;
    name: string;
    stock: number;
    eqcode: string;
    roomNum: number;
}

export type Profiles = {
//   id: string
    id: string;
    email: string;
    name: number;
    isAdmin: boolean;
    prereq_Form5: boolean;
    prereq_Attendance: boolean;
}


export const eq_columns: ColumnDef<Equipment>[] = [

    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "Name",  
    },
    {
        accessorKey: "stock",
        header: "Stock",
    },
    {
        accessorKey: "eqcode",
        header: "Code",
    },
    {
        accessorKey: "roomNum",
        header: "Room",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const equipment = row.original

            const handleDelete = () => {
                console.log("deleting:", equipment.eq_id);
                deleteEquipment(equipment.eq_id);
            }

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem

                >Edit</DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => {handleDelete()}}
                >Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
]

export const profiles_columns: ColumnDef<Profiles>[] = [

    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "email",
        header: "Email",  
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "isAdmin",
        header: "Admin",
    },
    {
        accessorKey: "prereq_Form5",
        header: "Form5",
    },
    {
        accessorKey: "prereq_Attendance",
        header: "Attendance",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const profiles = row.original

            const handleDelete = () => {
                console.log("deleting:", profiles.id);
                deleteEquipment(profiles.id);
            }
            const handleVerify = () => {
                console.log("verifying:", profiles.name);
                verifyUser.bind(
                    null,
                    profiles.id,
                    !profiles.isAdmin,
                );
                console.log("isAdmin:", profiles.isAdmin);
               
            }

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                    onClick={() => {handleVerify()}}
                >Verify</DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => {handleDelete()}}
                >Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
]
