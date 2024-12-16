// Import necessary components and utilities
import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { updateEquipment } from "../actions";
import { Equipment } from "./equipments/equipment-columns";
import {Trash, Pencil } from "lucide-react"
// Define the props for the UpdateEquipment component
type UpdateEquipmentProps = {
  equipment: Equipment; // Equipment data to be updated
  onUpdate: (updatedEquipment: Equipment) => void; // Callback after successful update
};

export default function UpdateEquipment({ equipment, onUpdate }: UpdateEquipmentProps) {
  // State for managing form data and loading state
  const [formData, setFormData] = useState<Partial<Equipment>>(equipment);
  const [loading, setLoading] = useState(false);

  // Handle input changes and update formData state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Convert numeric fields to numbers, else store the value as-is
    setFormData((prev) => ({
      ...prev,
      [name]: name === "stock" || name === "roomNum" ? Number(value) : value,
    }));
  };

  // Handle form submission to update equipment
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Indicate the form is being processed

    try {
      // Call the update API and pass the updated form data
      const updated = await updateEquipment(equipment.eq_id, formData);

      // Notify the user of success
      toast({
        title: "Equipment updated",
        description: `${formData.name} has been successfully updated.`,
      });

      // Trigger the callback to refresh or update the parent component state
      onUpdate({ ...equipment, ...formData } as Equipment);
    } catch (err: any) {
      // Handle any errors and notify the user
      toast({
        variant: "destructive",
        title: "Failed to update equipment",
        description: err.message,
      });
    } finally {
      setLoading(false); // Reset loading state after operation
    }
  };

  return (
    <Dialog>
      {/* Trigger button to open the update dialog */}
      <DialogTrigger asChild>
        <Button variant="outline">  <Pencil className="h-4 w-4" /> </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Equipment</DialogTitle>
        </DialogHeader>
        {/* Form for updating equipment details */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Equipment Name Input */}
          <div>
            <Label htmlFor="name">Equipment Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
            />
          </div>
          {/* Stock Input */}
          <div>
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              name="stock"
              type="number"
              value={formData.stock || 0}
              onChange={handleChange}
            />
          </div>
          {/* Code Name Input */}
          <div>
            <Label htmlFor="eqcode">Code Name</Label>
            <Input
              id="eqcode"
              name="eqcode"
              value={formData.eqcode || ""}
              onChange={handleChange}
            />
          </div>
          {/* Room Number Input */}
          <div>
            <Label htmlFor="roomNum">Room Number</Label>
            <Input
              id="roomNum"
              name="roomNum"
              type="number"
              value={formData.roomNum || 0}
              onChange={handleChange}
            />
          </div>
          {/* Description Input */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
            />
          </div>
          {/* Image URL Input */}
          <div>
            <Label htmlFor="img">Image URL</Label>
            <Input
              id="img"
              name="img"
              value={formData.img || ""}
              onChange={handleChange}
            />
          </div>
          {/* Footer with Submit Button */}
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
