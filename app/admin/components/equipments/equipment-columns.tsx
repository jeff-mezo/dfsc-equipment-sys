"use client"

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { deleteEquipment, deleteIncident, verifyUser } from "../../actions/index";
import { Router } from "next/router";
import { profile } from "console";
import { toast } from "@/components/ui/use-toast";
import { CartItem } from "@/app/equipmentpage/cartContext";
import { getCoreRowModel, createTable } from '@tanstack/react-table';
import useUser from "@/app/hook/useUser";
import { useQueryClient } from "@tanstack/react-query";
import UpdateEquipment from "../update-equipment";
import { useState } from "react";
import {Trash, Pencil } from "lucide-react"

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
    description: string;
    img: string;
}

export type Profiles = {
//   id: string
    id: string;
    email: string;
    name: number;
    isAdmin: boolean;
    isVerified: boolean;
    prereq_Form5: boolean;
    prereq_Attendance: boolean;
}

export type Incident = {
    id: number;
    studentnum: string;
    date_incident: string;
    time_incident: string;
    description: string;
    adviser: string;
    hasProof: boolean;
    degreeProg: string;
    email: string;
    eq_name: string;
    status: boolean;
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
        const equipment = row.original;
        const queryClient = useQueryClient();
  
        const handleDelete = () => {
          deleteEquipment(equipment.eq_id)
            .then(() => {
              toast({
                title: "Equipment deleted",
                description: `${equipment.name} has been deleted successfully.`,
              });
              // Invalidate equipment data to refresh the table
              queryClient.invalidateQueries({ queryKey: ["equipment"] });

            })
            .catch((err) => {
              toast({
                variant: "destructive",
                title: "Failed to delete equipment",
                description: err.message,
              });
            });
        };
  
        const handleUpdate = (updatedEquipment: Equipment) => {
          toast({
            title: "Equipment updated",
            description: `${updatedEquipment.name} has been updated successfully.`,
          });
          queryClient.invalidateQueries({ queryKey: ["equipment"] }); // Refresh table data
        };
        
  
        return (
          <div className="flex items-center">
            <Button className="mx-2" variant="outline" onClick={handleDelete}>
              <Trash className="h-4 w-4" />
            </Button>
            <UpdateEquipment
              equipment={equipment}
              onUpdate={handleUpdate}
            />
          </div>
        );
      },
    },
  ];
  



export const incident_columns: ColumnDef<Incident>[] = [
    // TODO: continue adding sorting feature to other columns and table
    {
        accessorKey: "id",
        header: ({ column }) => {
            return(
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    ID
                    {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
                </Button>
            )
        },
    },
    {
        accessorKey: "studentnum",
        header: ({ column }) => {
            return(
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Student No.
                    {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
                </Button>
            )
        },
    },
    {
        accessorKey: "date_incident",
        header: "Incident Date",
    },
    {
        accessorKey: "time_incident",
        header: "Incident Time",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "adviser",
        header: "Adviser",
    },
    {
        accessorKey: "hasProof",
        header: "Proof",
    },
    {
        accessorKey: "degreeProg",
        header: "Program",
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
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.status;
            const statusClass = status === true 
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800";

            return (
                (status == true) ? 
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusClass}`}>
                    Solved
                </span>

                :
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusClass}`}>
                    Unresolved
                </span>

            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const incident = row.original

            const handleDelete = () => {
                console.log("deleting:", incident.id);
                deleteIncident(incident.id);
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
                {/* <DropdownMenuItem

                >Edit</DropdownMenuItem> */}
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
        accessorKey: "isVerified",
        header: "Verified",
        cell: ({ row }) => {
            const status = row.original.isVerified;
            const statusClass = status === false 
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800";

            return (
                (status == false) ? 
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusClass}`}>
                    Verified
                </span>

                :
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusClass}`}>
                    Unverified
                </span>

            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const { isFetching, data } = useUser();
            const queryClient = useQueryClient();

            const profiles = row.original

            const handleDelete = () => {
                console.log("deleting:", profiles.id);
                deleteEquipment(profiles.id);
            }
            const handleVerify = async () => {
                console.log("verifying:", profiles.name);
                const result = await verifyUser(
                    profiles.id,
                    !profiles.isVerified,
                    data
                );
                console.log("isAdmin:", profiles.isVerified);
                const { error, data: todo } = JSON.parse(result);
                if (error?.message) {
                    console.log(error.message)
                } else {
                    console.log("success")
                }
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
                    onClick={() => {
                        handleVerify(); 
                        toast({
                            description: (<p>{profiles.name } verified</p>)
                        })
                    }}
                >Verify</DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => {
                        handleVerify(); 
                        toast({
                            description: (<p>{profiles.name } unverified</p>)
                        })
                    }}
                >Unverify</DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => {handleDelete()}}
                >Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
]
