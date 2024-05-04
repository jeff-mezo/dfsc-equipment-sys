import React from 'react'
import { Input } from "@/components/ui/input"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import UpLogo from "@/public/upLogo.png"
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"

const Login = () => {
  return (
    <main>
      {/* NAVBAR */}
      <header className="absolute flex items-center justify-between h-16 w-screen px-4 md:px-6 bg-white dark:bg-gray-950 shadow">
        <Link className="flex items-center gap-2" href="#">
            <Image src={UpLogo} alt="UpLogo"
                className="w-12"/>
            <h1>DFSC Equipment Reservation System</h1>  
        </Link>
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


    {/* LOGIN CARD */}
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form className="space-y-4">
          <Input id="email" placeholder="Email" type='email' />
          <Input id="password" placeholder="Password" type="password" />
          <div>
            <Link className="text text-sm up-text-red" href="#">
              Forgot Password
            </Link>
          </div>
          <Button className="w-full up-primary-red">Login</Button>
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