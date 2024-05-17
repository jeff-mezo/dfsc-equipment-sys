'use client';
import React from 'react'
import { Input } from "@/components/ui/input"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Header from "@/components/navbar"
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"
import { login, signup } from '../../../utils/actions'
import { createClient } from '@/utils/supabase/client'
import { useSession } from '@supabase/auth-helpers-react'

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
        redirectTo: location.origin + "/auth/callback"
      },
    })
    
  }
  

const Login = () => {
  const session = useSession();
  return (
    
    <main>
      
    {/* LOGIN CARD */}
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form className="space-y-4">
          <Input id="email" name="email" placeholder="Email" type='email' />
          <Input id="password" name="password" placeholder="Password" type="password" />
          <div>
            <Link className="text text-sm up-text-red" href="#">
              Forgot Password
            </Link>
          </div>
          <Button className="w-full up-primary-red" formAction={login}>Login</Button>
          <Button className="w-full" variant={'outline'} onClick= {signInWithGoogle}>
            <ChromeIcon className="mr-2 h-4 w-4" />
            Signin with Google
          </Button>
        </form>
        
        <div className="text-center">
          <p className="text-sm">
          Don&apos;t have an account? {" "}
            <Link className="text up-text-red" href="signup">
              Signup
            </Link>
          </p>
          <p className="text-sm">

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

function ChromeIcon(props: any) {
  return (
    <svg
      {...props}
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
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  )
}

export default Login