"use client"
import React from 'react'
import Link from 'next/link'
import Image from "next/image"
import UpLogo from '@/public/upLogo.png'
import { Sheet, SheetTrigger, SheetContent }  from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { MenuIcon } from 'lucide-react'
import useUser from '@/app/hook/useUser'
import { useQueryClient } from '@tanstack/react-query'
import { SupabaseClient } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { login } from '@/utils/actions'

const Header = () => {

    const { isFetching, data } = useUser();
    const queryClient = useQueryClient();
    const router = useRouter();
    
    if(isFetching){
        return <></>
    }

    const handleLogout = async () => {
        const supabase = createClient();
        queryClient.clear();
        await supabase.auth.signOut();
        router.refresh();
    }

  return (
    <header className="absolute flex items-center justify-between h-16 w-screen px-4 md:px-6 bg-white dark:bg-gray-950 shadow">
        <Link className="flex items-center gap-2" href="/equipmentpage">
            <Image src={UpLogo} alt="UpLogo"
                className="w-12"/>
            <h1>DFSC Equipment Reservation System</h1>  
        </Link>
        <nav className="hidden md:flex gap-6 text-sm font-medium ">
            {data?.id ? <Link className="hover:underline underline-offset-4" href="/profile">
                {data.email}
            </Link> : <></>}
            
            {data?.name ? <Link className="hover:underline underline-offset-4" href="#" onClick={handleLogout}>
                Log Out
            </Link>
            : 
            <Link href="/login">
                <Button className="bg-[#9B151E] hover:bg-[#9B151E]/90 text-white " size="sm">Sign In</Button>
            </Link>
            }
            
        </nav>
        <Sheet>
            <SheetTrigger asChild>
                <Button className="md:hidden" size="icon" variant="outline">
                    <MenuIcon />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
                <SheetContent side="right">
                    <div className="grid gap-4 p-4">
                        <Link className="hover:underline underline-offset-4" href="#">
                            jamze@up.edu.ph
                        </Link>
                        <Link className="hover:underline underline-offset-4" href="#">
                            Log Out
                        </Link>
                    </div>
                </SheetContent>
        </Sheet>
        {/* <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link className="hover:underline underline-offset-4" href="#">
            Home
            </Link>
            <Link className="hover:underline underline-offset-4" href="#">
            About
            </Link>
            <Link className="hover:underline underline-offset-4" href="#">
            Services
            </Link>
            <Link className="hover:underline underline-offset-4" href="#">
            Contact
            </Link>
        </nav> */}
    {/* <Sheet>
            <SheetTrigger asChild>
                <Button className="md:hidden" size="icon" variant="outline">
                    <MenuIcon />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
                <SheetContent side="right">
                    <div className="grid gap-4 p-4">
                        <Link className="font-medium hover:underline underline-offset-4" href="#">
                        Home
                        </Link>
                        <Link className="font-medium hover:underline underline-offset-4" href="#">
                        About
                        </Link>
                        <Link className="font-medium hover:underline underline-offset-4" href="#">
                        Services
                        </Link>
                        <Link className="font-medium hover:underline underline-offset-4" href="#">
                        Contact
                        </Link>
                    </div>
                </SheetContent>
        </Sheet> */}
    </header>
  )
}

export default Header