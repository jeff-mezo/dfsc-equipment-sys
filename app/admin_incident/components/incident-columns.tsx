"use client"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";


export type Incident = {
    user: string
    email: string
    equipment: string
    description: string
    reported_date: string
    status: "Pending" | "Resolved"
}

export const columns: ColumnDef<Incident>[] = [
    {
        accessorKey: "user",
        header: "User",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "equipment",
        header: "Equipment",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "reported_date",
        header: "Date Reported",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.status;
            const statusClass = status === "Pending" 
                ? "bg-yellow-100 text-yellow-800" 
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

                >Mark as Resolved</DropdownMenuItem>
                <DropdownMenuItem
                //  onClick={() => {handleDelete()}}
                >Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
]
