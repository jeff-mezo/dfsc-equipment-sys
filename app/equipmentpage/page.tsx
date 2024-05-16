'use client'

import EquipmentCard from '@/components/equipment'
import { supabase } from '@/config/supabaseClient'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectValue, SelectGroup, SelectContent, SelectItem, SelectLabel } from '@/components/ui/select'
import React from 'react'

import { useEffect, useState } from 'react'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ShoppingCart } from 'lucide-react'


interface Equipment {
  id: number;
  name: string;
  description: string;
  img: string;
  stock: number;
}

// interface CartItem {
//   id: number;
//   name: string;
//   quantity: number;
// }

const Dashboard = () => {

  const [fetchError, setFetchError] = useState<string | null>(null);
  const [equipment, setEquipment] = useState<Equipment[] | null>(null);
  
  useEffect(() => {
    const fetchEquipment = async () => {
      const { data, error } = await supabase.from('equipments').select()

        if (error) {
          setFetchError(error.message);
          setEquipment(null);
        } else {
          setEquipment(data as Equipment[]); // Cast data to Equipment[]
        }
    };
    
    fetchEquipment();
  }, [])

  

  return (
    <div className='pt-20'>

      <div className='px-10 flex flex-wrap justify-center lg:justify-start lg:w-9/12 mx-auto'>
          
        <div className='flex flex-row w-full mx-auto px-5 justify-between'>
          <div className='flex flex-row'>
            <Select>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="apple">Filter1</SelectItem>
                  <SelectItem value="banana">Filter1</SelectItem>
                  <SelectItem value="blueberry">Filter1</SelectItem>
                  <SelectItem value="grapes">Filter1</SelectItem>
                  <SelectItem value="pineapple">Filter1</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <span className="px-1"></span>
            <Select>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="apple">Sort1</SelectItem>
                  <SelectItem value="banana">Sort1</SelectItem>
                  <SelectItem value="blueberry">Sort1</SelectItem>
                  <SelectItem value="grapes">Sort1</SelectItem>
                  <SelectItem value="pineapple">Sort1</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className='flex flex-row'>

            {/* CART DIALOG: */}
          <Dialog> 
            <DialogTrigger asChild>
                <Button variant='outline' id='viewCart'>
                <ShoppingCart className="mr-2 h- w-4" /> View Cart
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Equipment Cart</DialogTitle>
                </DialogHeader>

                {/* CART ITEMS vvv */}
                {   
                    equipment && equipment.map(equipmentItem => (     
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-[auto_1fr] items-center gap-4">
                                <img
                                alt="item"
                                className="aspect-square rounded-md object-cover"
                                height={64}
                                src={ equipmentItem.img }
                                width={64}
                                />
                                <div className="space-y-1">
                                <p className="font-medium">{ equipmentItem.name }</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Quantity: { equipmentItem.stock }</p>
                                </div>
                            </div>
                        </div>
                    ))
                }

                <Button className='up-primary-red'>Continue Reservation</Button>
            </DialogContent>
        </Dialog>



            <span className="md:px-1"></span>
            <Button className='up-primary-red' id='reserve'>
              Reserve Equipment
            </Button>
          </div>

        </div>

          {fetchError ? (
              <div>Error fetching equipment: {fetchError}</div>
            ) : equipment ? (
              equipment.map((equipmentItem) => (
                <EquipmentCard
                  eqName={equipmentItem.name}
                  eqDesc={equipmentItem.description}
                  eqImg={equipmentItem.img}
                  eqStock={equipmentItem.stock}
                  eqId={equipmentItem.id}
                  key={null}
                />
              ))
            
            ) : (
              <div>Loading equipment...</div>
            )}



        </div>
    </div>
  )
}



export default Dashboard