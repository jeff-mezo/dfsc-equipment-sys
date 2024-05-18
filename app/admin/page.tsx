import React from 'react'
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

const Admin = () => {
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
    </div>
  )
}

export default Admin