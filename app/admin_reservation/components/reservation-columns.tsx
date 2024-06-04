"use client"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Url } from "next/dist/shared/lib/router/router";


export type Reservation = {
    name: string
    email: string
    eq_name: string
    quantity: number
    borrow_date: string //Temporary
    return_date: string //Temporary
    status: "Approved" | "Denied" 
}

export const columns: ColumnDef<Reservation>[] = [
    {
        accessorKey: "name",
        header: "User",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "eq_name",
        header: "Equipment",
    },
    {
        accessorKey: "quantity",
        header: "Quantity",
    },
    {
        accessorKey: "borrow_date",
        header: "Borrow Date",
    },

    {
      accessorKey: "return_date",
      header: "Return Date",
    },
    
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.status;
            const statusClass = status === "Denied" 
                ? "bg-red-100 text-red-800" 
                : "bg-green-100 text-green-800";

            return (
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusClass}`}>
                    {status}
                </span>
            );
        },
    },


    {
        id: "actions",
        cell: ({ row }) => {
            const equipment = row.original

            const handleDelete = () => {
               // console.log("deleting:", equipment.eq_id);
                //deleteEquipment(equipment.eq_id);
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

                >Mark as Approved</DropdownMenuItem>
                <DropdownMenuItem
                //  onClick={() => {handleDelete()}}
                >Mark as Denied</DropdownMenuItem>
                 <DropdownMenuItem
                //  onClick={() => {handleDelete()}}
                >Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
]
