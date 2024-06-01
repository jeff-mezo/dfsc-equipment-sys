/**
 * v0 by Vercel.
 * @see https://v0.dev/t/BNeZNWFkCUB
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CirclePlus } from "lucide-react"

export default function CreateEquipment() {
  return (
    <Dialog>
      <DialogTrigger asChild>
          <Button variant={'outline'}>
              <CirclePlus className='h-4' />
              <span>Add Equipment</span>
          </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>New Equipment</DialogTitle>
          <DialogDescription>Fill out the form to create a new equipment item.</DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Equipment Name</Label>
              <Input id="name" placeholder="Enter equipment name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input id="stock" type="number" placeholder="Enter stock quantity" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Enter equipment description" className="min-h-[100px]" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="codeName">Code Name</Label>
              <Input id="codeName" placeholder="Enter code name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="roomLocation">Room Location</Label>
              <Input id="roomLocation" placeholder="Enter room location" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input id="imageUrl" placeholder="Enter image URL" />
          </div>
        </form>
        <DialogFooter>
          <div>
            <Button variant="outline">Cancel</Button>
          </div>
          <Button type="submit">Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}