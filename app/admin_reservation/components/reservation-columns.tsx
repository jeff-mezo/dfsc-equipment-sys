"use client"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Url } from "next/dist/shared/lib/router/router";
import { supabase } from "@/config/supabaseClient";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { CartItem } from "@/app/equipmentpage/cartContext";
import { getCoreRowModel, createTable } from '@tanstack/react-table';

export type Reservation = {
    status: boolean ;
    name: string;
    email: string;
    eq_name: string;
    quantity: number;
    borrow_date: string; //Temporary
    return_date: string; //Temporary
}

const fetchReservationsWithEquipment = async (): Promise<CartItem[]> => {
  try {
    const { data, error } = await supabase
      .from('cart_items')
      .select()

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return [];
  }
};
  

export const columns: ColumnDef<Reservation>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
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
        cell: ({row}) => {
          console.log(row.original.borrow_date)
          const [data, setData] = useState<CartItem[]>([]);

          useEffect(() => {
            const fetchData = async () => {
              const reservations = await fetchReservationsWithEquipment();
              setData(reservations);
            };

            fetchData();
          }, []);

          console.log(data)

          const equipments = data.map((e) => {e.name});
          return (
            <span>
              {equipments.join(', ')}
            </span>
          );
        }
    },
    {
        accessorKey: "project",
        header: "Project",
    },
  
    
    // {
    //     accessorKey: "status",
    //     header: "Status",
    //     // cell: ({ row }) => {
    //     //     const status = row.original.status;
    //     //     const statusClass = status === false 
    //     //         ? "bg-red-100 text-red-800" 
    //     //         : "bg-green-100 text-green-800";

    //     //     return (
    //     //         <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusClass}`}>
    //     //             {status}
    //     //         </span>
    //     //     );
    //     // },
    // },


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
