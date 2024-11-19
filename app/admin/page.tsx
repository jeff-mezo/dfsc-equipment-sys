'use client'
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { CirclePlus } from 'lucide-react'
import { EquipmentDataTable } from '@/app/admin/components/equipments/equipment-data-table'
import { ProfilesDataTable } from '@/app/admin/components/equipments/profiles-data-table'
import { Profiles, eq_columns, profiles_columns } from "./components/equipments/equipment-columns"
import { fetchProfiles } from '@/utils/actions'
import { supabase } from '@/config/supabaseClient'
import { profile } from 'console'
import { GetServerSideProps, NextPage } from 'next'
import * as pdfjslib from 'pdfjs-dist';

type Profile = {
    id: string;
    name: string;
    contactno: string;
    isAdmin: boolean;
    // add other fields as per your profiles table
  };
  
type Props = {
    profiles: Profile[];
};



const UserVerification = async () => {
    const { data: equipmentData, error: equipmentError } = await supabase.from('equipments').select('*');
    const { data: profileData, error: profileError } = await supabase.from('profiles').select('*');

    if (equipmentError || profileError) {
        console.error({ equipmentError, profileError });
        return <div>Error loading data</div>;
      }

    return (
        <div className='pt-20'>

            <Card className='w-9/12 mx-auto'>
                <CardHeader>
                    <CardTitle>Inventory:</CardTitle>
                </CardHeader>
                <CardContent>
                    {/* <Dialog>
                        <DialogTrigger asChild>
                            <Button variant={'outline'}>
                                <CirclePlus className='h-4' />
                                <span>Add New Equipment</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add New Equipment</DialogTitle>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog> */}
                    <span className='w-1'>{"   "}</span>

                    
                    <div className='mt-1 max-96'>
                        <EquipmentDataTable columns={eq_columns} data={equipmentData} />
                    </div>

                </CardContent>    
            </Card>           
            <Card className='w-9/12 mx-auto my-5'>
                <CardHeader>
                    <CardTitle>User Management:</CardTitle>
                </CardHeader>
                <CardContent className='space-y-2'>
                    {/* <Dialog>
                        <DialogTrigger asChild>
                            <Button variant={'outline'} className='w-full'>
                                <CirclePlus className='h-4' />
                                <span>Pending User Verification</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Pending User Verification</DialogTitle>
                                <div className='w-full px-5 flex justify-between'>
                                    <img src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png" alt="user_prof" className='h-10'/>
                                    <Dialog> 
                                        <DialogTrigger asChild>
                                            <Button className='up-primary-color'>Verify</Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Are you sure you want to verify user?</DialogTitle>
                                            </DialogHeader>
                                            <div className='flex justify-end'>
                                                <Button variant={'outline'}>Cancel</Button>
                                                <Button>Confirm</Button>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    <span className='w-1'>{"   "}</span> */}

                    {/* <Dialog>
                        <DialogTrigger asChild>
                            <Button variant={'outline'}>
                                <CirclePlus className='h-4' />
                                <span>Delete Equipment</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Delete Equipment</DialogTitle>
                                <p>test</p>
                                
                            </DialogHeader>
                            
                        </DialogContent>
                        
                    </Dialog> */}
                    <div className='mt-1 max-96'>
                        <ProfilesDataTable columns={profiles_columns} data={profileData} />
                    </div>   
                </CardContent>    
            </Card>    
            
            {/* fetchError ? console.log("Error Fetching Users") :  */}
            
        </div>
    )

    
}


export default UserVerification;
