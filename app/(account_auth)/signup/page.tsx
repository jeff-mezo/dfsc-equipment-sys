'use client';
import { Input } from "@/components/ui/input"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import UpLogo from "@/public/upLogo.png"
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"
import { supabase } from '@/config/supabaseClient'
import { login, signup } from '@/utils/actions'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

const signInWithGoogle = () =>
  {
    const supabase = createClient();
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })
    
  }

export default function SignUp() {
  return (
    <main>    
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow">
          <h1 className="text-2xl font-bold text-center">Signup</h1>
          <form className="space-y-4">
            <Input id="name" name="name" placeholder="Name" />
            <Input id="email" name="email" placeholder="Email" type="email" />
            <div className="">{/*  grid grid-cols-2 gap-4 */}
            {/*   <Input id="student-no" placeholder="Student No." type="number" />
              <Select>
                <SelectTrigger id="year-level">
                  <SelectValue placeholder="Year Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="freshman">Freshman</SelectItem>
                  <SelectItem value="sophomore">Sophomore</SelectItem>
                  <SelectItem value="junior">Junior</SelectItem>
                  <SelectItem value="senior">Senior</SelectItem>
                  <SelectItem value="graduate">Graduate</SelectItem>
                </SelectContent>
              </Select> */}
            </div>
            <Input id="contact-no" name="contactNo" placeholder="Contact No." type="number" />
            <Input id="password" name="password" placeholder="Password" type="password" />
            <Input id="confirm-password" name="confPasswrod" placeholder="Confirm Password" type="password" />
            <Input id="isadmin" name="isadmin" className="hidden" type="number" value={0}/>
            <Button className="w-full up-primary-red" formAction={signup} >Signup</Button>
          </form>
          <div className="text-center">
            <p className="text-sm">
              <Button className="w-full up-primary-red" onClick= {signInWithGoogle} >Signup with Google</Button>
            </p>
            <p className="text-sm">
              <Link className="text up-text-red \" href="login">
                Become an Admin
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}



function MenuIcon() {
    return (
        <svg
        className="h-6 w-6" 
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        >
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
)}

/* async function signUpNewUser() {
  const { data, error } = await supabase.auth.signUp({
    email: 'example@email.com',
    password: 'example-password',
    
  })
}
*/





  
  function MountainIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
      </svg>
    )
  }