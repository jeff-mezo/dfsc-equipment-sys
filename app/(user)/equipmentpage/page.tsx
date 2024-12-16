'use client'

import EquipmentCard from '@/components/equipment'
import { supabase } from '@/config/supabaseClient'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectValue, SelectGroup, SelectContent, SelectItem, SelectLabel } from '@/components/ui/select'
import React, { useCallback, useContext, useRef } from 'react'

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
import { SearchIcon, ShoppingCart } from 'lucide-react'
import { Equipment } from '@/components/equipment'
import Link from 'next/link'
import CartContext from './cartContext'
import { Input } from '@/components/ui/input'
import { Search } from '@/components/search'
import { useDebounce } from 'use-debounce'
import { debounce } from 'lodash'
// import { CartView } from './cart'


// interface Equipment {
//   id: string;
//   name: string;
//   image: string;
//   stock: number;
//   quantity: number;
// }

// interface CartItem {
//   id: number;
//   name: string;
//   quantity: number;
// }

// interface Equipment {
//   eqImg: string;
//   eqName: string;
//   eqDesc: string;
//   eqStock: number;
//   eqId: string;
//   eqQuan: number;
// }

interface ListEquipmentProps {
  data: {
    equipment: Equipment[];
  }
}

const Dashboard = () => {
  const { cart } = useContext(CartContext);
  

  // const [fetchError, setFetchError] = useState<string | null>(null);
  // const [equipment, setEquipment] = useState<Equipment[] | null>(null);
  
  // useEffect(() => {
  //   const fetchEquipment = async () => {
  //     const { data, error } = await supabase.from('equipments').select()

  //       if (error) {
  //         setFetchError(error.message);
  //         setEquipment(null);
  //       } else {
  //         setEquipment(data as Equipment[]); // Cast data to Equipment[]
  //       }
  //   };
    
  //   fetchEquipment();
  // }, [])

  const inputRef = useRef<HTMLInputElement>(null)
  const [text, setText] = useState('');


  const [fetchError, setFetchError] = useState<string | null>(null);
  const [equipment, setEquipment] = useState<Equipment[] | null>(null);

  
  // useEffect(() => {
    
    const fetchEquipment = async () => {
      const { data, error } = await supabase.from('equipments').select()

        if (error) {
          setFetchError(error.message);
          setEquipment(null);
        } else {
          setEquipment(data as Equipment[]); // Cast data to Equipment[]
        }
    };
    
  //   fetchEquipment();
  // }, [])

  const handleSearchState = async (searchQuery: string) => {
    if (searchQuery) {
      const { data, error } = await supabase
        .from('equipments')
        .select()
        .ilike('name', `%${searchQuery}%`); // Use ilike for case-insensitive matching
      
      if (error) {
        setFetchError(error.message);
        setEquipment(null);
      } else {
        setEquipment(data as Equipment[]); // Cast data to Equipment[]
      }
    } else {
      // If search query is empty, fetch all equipment again
      fetchEquipment();
    }
  };
  

  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      handleSearchState(searchQuery);
    }, 500),
    []
  );

  useEffect(() => {
    fetchEquipment();
  }, []);

  useEffect(() => {
    debouncedSearch(text)
  }, [text, debouncedSearch])
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleClear = () => {
    setText('');
    fetchEquipment();
  };
  

  return (
    <div className=''>

      <div className='px-10 flex flex-wrap justify-center lg:justify-start lg:w-9/12 mx-auto'>
          
        <div className='top-20 mx-auto my-8 z-999 flex flex-row px-5 justify-between  bg-white h-16 w-screen  '>
          <div className='flex flex-row'>

            {/* <Search /> */}
            <div className="relative w-full sm:w-auto">
              <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                  className="w-full rounded-md border border-gray-300 bg-white px-10 py-2 text-sm focus:border-[#9B151E] focus:ring-[#9B151E] dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50"
                  placeholder="Search equipment..."
                  type="text"
                  value={text}
                  onChange={handleChange}
                  ref={inputRef}
              />
            </div>
            <Button variant='outline' id='viewCart' className='mx-2' onClick={handleClear}>Clear</Button>
            {/* <Select>
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
            </Select> */}
          </div>
          <div className='flex flex-row'>
          <Link href="/reservation">
            <Button variant='outline' id='viewCart' className='bg-[#9B151E] hover:bg-[#9B151E]/90 hover:text-white text-white '>
              <ShoppingCart className="mr-2 h- w-4" /> View equipments ({cart?.cartItems?.length || 0})
            </Button>
          </Link>

            {/* CART DIALOG: */}



            <span className="md:px-1"></span>
            {/* <Button className='up-primary-red' id='reserve'>
              Reserve Equipment
            </Button> */}
          </div>

        </div>
          {/* {fetchError ? (
                <div>Error fetching equipment: {fetchError}</div>
              ) : equipment ? (
                equipment.map((equipmentItem) => {
                  console.log(equipmentItem.name)
                  return <></>;
                })
              )       
              : (
                <div>Loading equipment...</div>
              )

            } */}

 
          {fetchError ? (
              <div>Error fetching equipment: {fetchError}</div>
            ) : equipment ? (
              equipment.map((equipmentItem) => (
                <EquipmentCard 
                  key={equipmentItem?.id}
                  product={equipmentItem}
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