import React from 'react'
import { Input } from "@/components/ui/input"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Header from "@/components/navbar"
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"
import { login, signup } from './actions'



const Login = () => {
  return (
    <main>
    {/* NAVBAR */}
    

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
        </form>
        <div className="text-center">
          <p className="text-sm">
          Don't have an account? {" "}
            <Link className="text up-text-red" href="signup">
              Signup
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

export default Login