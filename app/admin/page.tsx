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
import { DataTable } from '@/app/admin/data-table'
import { User, columns } from "./columns"
import { fetchProfiles } from '@/utils/actions'
import { supabase } from '@/config/supabaseClient'
import { profile } from 'console'
import { GetServerSideProps, NextPage } from 'next'

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

// async function getUsers(): Promise<User[]> {
//     const res = await fetch(
//       'https://64a6f5fc096b3f0fcc80e3fa.mockapi.io/api/users'
//     )
//     const data = await res.json();
//     return data
// }

    

// const columns = [
//     { Header: 'Name', accessor: 'name' },
//     { Header: 'Email', accessor: 'email' },
//     { Header: 'Status', accessor: 'status' },
// ]

async function getData(): Promise<User[]> {
    // Fetch data from your API here.
    
    return fetchProfiles();
  }
   


const UserVerification = async () => {

    // const [users, setUsers] = React.useState<User[]>([]);

    // React.useEffect(() => {
    // const fetchUsers = async () => {
    //     const { data, error } = await supabase
    //     .from('profiles') // Replace 'users' with your actual table name
    //     .select();

    //     if (error) {
    //     console.error('error fetching users:', error);
    //     return;
    //     }

    //     setUsers(data);
    // };

    // fetchUsers();
    // }, []);

    const profiles = await getData();

    return (
        <div className='pt-20'>
            <Card className='w-full max-w-md mx-auto'>
                <CardHeader>
                    <CardTitle>Inventory Controls:</CardTitle>
                </CardHeader>
                <CardContent>
                    <Dialog>
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
                    </Dialog>
                    <span className='w-1'>{"   "}</span>

                    <Dialog>
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
                    </Dialog>

                </CardContent>    
            </Card>    
            <Card className='w-full max-w-md mx-auto'>
                <CardHeader>
                    <CardTitle>User Management:</CardTitle>
                </CardHeader>
                <CardContent className='space-y-2'>
                    <Dialog>
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
                    <span className='w-1'>{"   "}</span>

                    <Dialog>
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
                    </Dialog>

                </CardContent>    
            </Card>    
            <div className='container mx-auto py-10'>
                <DataTable columns={columns} data={profiles} />
            </div>
            {/* fetchError ? console.log("Error Fetching Users") :  */}
            
        </div>
    )
}


export default UserVerification;
