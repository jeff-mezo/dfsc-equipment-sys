"use client"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Url } from "next/dist/shared/lib/router/router";
import {  deleteIncident, resolveIncident } from "../actions/index";
import useUser from "@/app/hook/useUser";
import { useQueryClient } from "@tanstack/react-query";


export type Incident = {
  id: string & number;
  name: string;
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

export const incident_columns: ColumnDef<Incident>[] = [
  // TODO: continue adding sorting feature to other columns and table
  {
      accessorKey: "name",
      header: ({ column }) => {
          return(
              <Button
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                  Name
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
                  Resolved
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
            const { isFetching, data } = useUser();
            const queryClient = useQueryClient();
          const incident = row.original

          const handleDelete = () => {
              console.log("deleting:", incident.id);
              deleteIncident(incident.id);
          }

          const handleResolve = async () => {
            console.log("resolving:", incident.name);
            const result = await resolveIncident(
                incident.id,
                !incident.status,
                data
            );
            console.log("Status:", incident.status);
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
              {/* <DropdownMenuItem

              >Edit</DropdownMenuItem> */}
              <DropdownMenuItem
                  onClick={() => {handleResolve()}}
              >Mark as Resolved</DropdownMenuItem>
              <DropdownMenuItem
                  onClick={() => {handleDelete()}}
              >Deleted</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
]
