'use client'

import EquipmentCard from '@/components/equipment'
import { supabase } from '@/config/supabaseClient'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { Select, SelectTrigger, SelectValue, SelectGroup, SelectContent, SelectItem, SelectLabel } from '@/components/ui/select'
import React from 'react'

import { useEffect, useState } from 'react'

type Equipment = {
  name: string;
  description: string;
  img: string;
  stock: number;
}

const Dashboard = () => {

  const [fetchError, setFetchError] = useState<string | null>(null);
  const [equipment, setEquipment] = useState<Equipment[] | null>(null);
  
  useEffect(() => {
    const fetchEquipment = async () => {
      const { data, error } = await supabase
        .from('equipments')
        .select()

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
            <Button variant='outline'>
              <ShoppingCart className="mr-2 h- w-4" /> View Cart
            </Button>
            <span className="md:px-1"></span>
            <Button className='up-primary-red'>
              Reserve Equipment
            </Button>
          </div>

        </div>

          <EquipmentCard 
            eqName='Microscope'
            eqDesc='test description test desc'
            eqImg='https://cdn.britannica.com/50/114750-050-06EEB5F0/compound-microscope.jpg'
            eqStock={8}
          /> 

          
          

          {fetchError ? (
              <div>Error fetching equipment: {fetchError}</div>
            ) : equipment ? (
              equipment.map((equipmentItem) => (
                <EquipmentCard
                  eqName={equipmentItem.name}
                  eqDesc={equipmentItem.description}
                  eqImg={equipmentItem.img}
                  eqStock={equipmentItem.stock}
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