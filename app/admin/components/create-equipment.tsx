"use client"

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CirclePlus } from "lucide-react"
import { useTransition, useState, ChangeEvent, FormEvent } from "react";
import { toast } from "@/components/ui/use-toast";
import { createEquipment } from "../actions"
import { Equipment } from "./equipments/equipment-columns"

export type EquipmentForm = {
  //   id: string
      name: string;
      stock: number;
      description: string;
      eqcode: string;
      img: string;
      roomNum: number;
  }


type FormState = {
  formData: EquipmentForm
  loading: boolean
  error: string | null
  success: boolean
}


export default function CreateEquipment() {
  const [state, setState] = useState<FormState>({
    formData: { name: '', stock: 0, description: '', eqcode: '', img: '', roomNum: 0},
    loading: false,
    error: null,
    success: false,
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setState((prevState) => ({
      ...prevState,
      formData: {
        ...prevState.formData,
        [name]: name === 'stock' || name === 'roomNum' ? Number(value) : value,
      },
    }))
  }

  const handleSubmit = async (e: FormEvent) => {

    console.log("submitting...", state.formData.name)
    e.preventDefault()
    setState((prevState) => ({
      ...prevState,
      loading: true,
      error: null,
      success: false,
    }))

    //try {
      //const { data, error } = await supabase.from('your_table_name').insert([state.formData])

      const result = await createEquipment(state.formData);
	 		const { error, data: todo } = JSON.parse(result);
			if (error?.message) {
				toast({
					variant: "destructive",
					title: "Fail to create equipment",
					description: (
						<pre className="mt-2 w-[640px] rounded-md bg-slate-950 p-4">
							<code className="text-white">{error.message}</code>
						</pre>
					),
				});
			} else {
				toast({
					title: "Successfully created equipment.",
					description: (
						<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
							<code className="text-white">
								{state.formData.name} is created
							</code>
						</pre>
					),
				});
      //}
    }
  }

    //   if (error) throw error

    //   setState((prevState) => ({
    //     ...prevState,
    //     loading: false,
    //     success: true,
    //     formData: { name: '', email: '', age: 0 }, // Reset form data on success
    //   }))
    // } catch (error) {
    //   setState((prevState) => ({
    //     ...prevState,
    //     loading: false,
    //     error: (error as Error).message,
    //   }))
    // }
    //}


  // function onSubmit(dt: Equipment) {
	// 	startTransition(async () => {
	// 		const result = await createEquipment(dt);
	// 		const { error, data: todo } = JSON.parse(result);

	// 		if (error?.message) {
	// 			toast({
	// 				variant: "destructive",
	// 				title: "Fail to create equipment",
	// 				description: (
	// 					<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
	// 						<code className="text-white">{error.message}</code>
	// 					</pre>
	// 				),
	// 			});
	// 		} else {
	// 			toast({
	// 				title: "Successfully created equipment.",
	// 				description: (
	// 					<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
	// 						<code className="text-white">
	// 							{dt.name} is created
	// 						</code>
	// 					</pre>
	// 				),
	// 			});
	// 			form.reset();
	// 		}
	// 	});
  // }

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
        <form 
          className="grid gap-4 py-4"
          onSubmit={handleSubmit}  
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Equipment Name</Label>
              <Input id="name" placeholder="Enter equipment name" name="name" value={state.formData.name} onChange={handleChange}/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input id="stock" type="number" placeholder="Enter stock quantity" name="stock" value={state.formData.stock} onChange={handleChange}/>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Enter equipment description" className="min-h-[100px]" name="description" value={state.formData.description} onChange={handleChange}/>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="codeName" >Code Name</Label>
              <Input id="codeName" placeholder="Enter code name" name="eqcode" value={state.formData.eqcode} onChange={handleChange}/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="roomLocation">Room Location</Label>
              <Input id="roomLocation" placeholder="Enter room location" name="roomNum" value={state.formData.roomNum} onChange={handleChange}/>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input id="imageUrl" placeholder="Enter image URL" name="img" value={state.formData.img} onChange={handleChange}/>
          </div>
        
        <DialogFooter>
          {/* <div>
            <Button variant="outline">Cancel</Button>
          </div> */}
          <Button type="submit">Create</Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}