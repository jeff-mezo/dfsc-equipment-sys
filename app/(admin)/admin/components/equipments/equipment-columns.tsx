"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Trash, Pencil } from "lucide-react";
import { deleteEquipment, verifyUser } from "../../actions/index";
import { toast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import UpdateEquipment from "../update-equipment";
import { FC } from "react";

// This type is used to define the shape of our data.
export type Equipment = {
  eq_id: string;
  id: number;
  name: string;
  stock: number;
  eqcode: string;
  roomNum: number;
  description: string;
  img: string;
};

export type Profiles = {
  id: string;
  email: string;
  name: number;
  isAdmin: boolean;
  isVerified: boolean;
  prereq_Form5: boolean;
  prereq_Attendance: boolean;
};

// Functional Component for Equipment Actions
const EquipmentActions: FC<{ equipment: Equipment }> = ({ equipment }) => {
  const queryClient = useQueryClient();

  const handleDelete = () => {
    deleteEquipment(equipment.eq_id)
      .then(() => {
        toast({
          title: "Equipment deleted",
          description: `${equipment.name} has been deleted successfully.`,
        });
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
    queryClient.invalidateQueries({ queryKey: ["equipment"] });
  };

  return (
    <div className="flex items-center">
      <Button className="mx-2" variant="outline" onClick={handleDelete}>
        <Trash className="h-4 w-4" />
      </Button>
      <UpdateEquipment equipment={equipment} onUpdate={handleUpdate} />
    </div>
  );
};

// Equipment Columns
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
    cell: ({ row }) => <EquipmentActions equipment={row.original} />,
  },
];

// Functional Component for Profile Actions
const ProfileActions: FC<{ profile: Profiles }> = ({ profile }) => {
  const queryClient = useQueryClient();

  const handleDelete = () => {
    console.log("Deleting profile:", profile.id);
    deleteEquipment(profile.id); // Adjust if `deleteEquipment` is not appropriate here.
  };

  const handleVerify = async (isVerified: boolean) => {
    console.log(isVerified ? "Verifying" : "Unverifying", profile.name);
    try {
      const result = await verifyUser(profile.id, isVerified, profile);
      const { error } = JSON.parse(result);
      if (error?.message) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      } else {
        toast({
          title: "Success",
          description: `${profile.name} ${
            isVerified ? "verified" : "unverified"
          } successfully.`,
        });
        queryClient.invalidateQueries({ queryKey: ["profiles"] });
      }
    } catch (err) {
      console.error("Verification failed", err);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleVerify(true)}>
          Verify
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleVerify(false)}>
          Unverify
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Profiles Columns
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
      const statusClass = status
        ? "bg-green-100 text-green-800"
        : "bg-red-100 text-red-800";

      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${statusClass}`}
        >
          {status ? "Verified" : "Unverified"}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ProfileActions profile={row.original} />,
  },
];
