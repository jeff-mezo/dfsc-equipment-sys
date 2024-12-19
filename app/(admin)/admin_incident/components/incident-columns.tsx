"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { deleteIncident,resolveIncident } from "../actions"; // Adjust the import path if necessary
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { FC } from "react";

export type Incident = {
  id: number;
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
};

// Functional Component for Actions
const IncidentActions: FC<{ incident: Incident }> = ({ incident }) => {
  const handleDelete = async () => {
    try {
      await deleteIncident(incident.id);
      console.log("Deleted incident:", incident.id);
      window.location.reload(); // Reload to reflect changes or use revalidatePath
    } catch (error) {
      console.error("Error deleting incident:", error);
    }
  };

  const handleResolve = async () => {
    try {
      const result = await resolveIncident(incident.id.toString(), !incident.status, null);
      const { error } = JSON.parse(result);
      if (error) {
        console.error("Error resolving incident:", error);
      } else {
        console.log("Resolved incident:", incident.id);
        window.location.reload(); // Reload to reflect changes or use revalidatePath
      }
    } catch (error) {
      console.error("Error resolving incident:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex flex-col px-8 w-60 up-primary-red">Mark as Resolved</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirm Incident to be Resolved</DialogTitle>
              <DialogDescription>
                Are you sure you want to mark this incident report as resolved? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
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
              <DialogDescription>
                Deleting this incident report will permanently remove all associated data. Are you sure?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
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
  );
};

// Columns Definition
export const incident_columns: ColumnDef<Incident>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "studentnum",
    header: "Student No.",
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
      const statusClass = status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusClass}`}>
          {status ? "Resolved" : "Unresolved"}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <IncidentActions incident={row.original} />,
  },
];
