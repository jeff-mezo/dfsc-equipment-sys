//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/*
DEC 7 2024 PATCH NOTES:
- Replaced database cell hasProof to incidentReportFilename to allow searching in PDF viewer
- Replaced Incident Proof Label to Incedent Report Filename 

LINKED FILES:
- clientActions.ts
- useUser.tsx
- incedent-data-table.tsx

WARNINGS:
- none

- Previous updates dev: interstellar-0614 (Jamze Reyno)
- Current updates dev: KanadeTachie (King Behimino)

^^^Change as necessary to track progress
*/ 
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
"use client"
import { Button } from "@/components/ui/button"
    
import { ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Url } from "next/dist/shared/lib/router/router";
import {  deleteIncident, resolveIncident } from "../actions/index";
import useUser from "@/app/hook/useUser";
import { useQueryClient } from "@tanstack/react-query";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog";


export type Incident = {
  id: string & number;
  name: string;
  studentnum: string;
  date_incident: string;
  time_incident: string;
  description: string;
  adviser: string;
  incidentReportFilename: string;
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
      accessorKey: "incidentReportFilename",
      header: "Incident Report Filename",
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
               <Dialog>
                    <DialogTrigger asChild>
                        <Button className="flex flex-col px-8 w-60 up-primary-red">Mark as Resolved</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Confirm Incident to be Resolved</DialogTitle>
                            <DialogDescription className="text-justify">
                                By marking this incident report as resolved, you confirm that all necessary actions have been taken, and the issue has been addressed to the satisfaction of all relevant parties. Are you sure you want to proceed?
                            </DialogDescription>
                            </DialogHeader>
                        <DialogFooter className="py-2">
                            <DialogClose asChild>
                                    <Button className="up-primary-red" onClick={handleResolve}>
                                        Mark as Resolved
                                    </Button>
                            </DialogClose>
                         </DialogFooter>
                    </DialogContent>
                </Dialog>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="px-8 w-60 mt-2 up-primary-red">Delete</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Confirm Incident to be Deleted</DialogTitle>
                            <DialogDescription className="text-justify">
                            By deleting this incident report, you acknowledge that all associated data will be permanently removed and cannot be recovered. Are you sure you want to proceed with this action?
                            </DialogDescription>
                            </DialogHeader>
                        <DialogFooter className="py-2">
                            <DialogClose asChild>
                                    <Button className="up-primary-red" onClick={handleDelete}>
                                        Delete
                                    </Button>
                            </DialogClose>
                         </DialogFooter>
                    </DialogContent>
                </Dialog>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
]
