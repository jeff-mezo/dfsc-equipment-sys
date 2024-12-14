//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/*
DEC 6 2024 PATCH NOTES:
- Added restriction to accept only pdf files
- Added checks if the user is logged in
- Added user session fetch to find userID currently logged in

LINKED FILES:
- clientActions.ts
- useUser.tsx

WARNINGS:
- Replaces old files

- Previous updates dev: jeff-mezo (Jeffer Mezo)
- Current updates dev: KanadeTachie (King Behimino)

^^^Change as necessary to track progress
*/ 
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

"use client"
import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Bell } from 'lucide-react'
import { handleFileUpload_Form5, handleFileUpload_Attendance } from '@/utils/clientActions'
import { useEffect, useState } from "react";
import { supabase } from '@/config/supabaseClient';
import useUser from '@/app/hook/useUser';


import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

const verification = () => {
  const [userID, setUserId] = useState<string | null>(null)
  const { isFetching, data } = useUser();

  //fetching userid of current user login. UID parsed to string and passed as filename for pdf
  useEffect(() => {
    if (data && data.id) {
      setUserId(data.id);
    }
  }, [data]);
  
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>, uploadHandler: (file: File, userID: string) => Promise<void>) => {
    const file = event.target.files?.[0];

    //no file
    if (!file) return;

    //no user login
    if (!userID) {
      alert("You are not logged in! Please log in first before uploading files.");
      return;
    }

    // File type checker
    if (file.type !== "application/pdf") {
      alert("Please upload only PDF files.");
        return;
    } else {
      try {
        await uploadHandler(file, userID);
      } catch (error) {
        console.error("File Upload Failed:", error);
      }
    }

  };

  return ( 
    <div className="overflow-x-hidden max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:pt-20">
      <div className="space-y-8 pt-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Reservation Prerequisite</h1>
          <p className="mt-2 text-md text-gray-600 dark:text-gray-400">
            Get verified and access our Reservation System
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Reservation Prerequisite Requirements</h2>
          </div>

          <form>
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
              <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:p-6 space-y-4">
                <div className="grid grid-cols-1">
                  <div>
                    <Label className="block px-3 text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="form5">
                      UP Form 5 (Official Registration Form)
                    </Label>
                    <Input
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      id="form5"
                      type="file"
                      required
                      onChange={(event) => handleFileChange(event, handleFileUpload_Form5)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 pt-5">
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="attendance">
                      Certificate of Attendance Orientation
                    </Label>
                    <Input
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      id="attendance"
                      type="file"
                      required
                      onChange={(event) => handleFileChange(event, handleFileUpload_Attendance)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 pt-3">
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="terms">
                      Accept Terms and Conditions
                    </Label>
                    <div className="flex items-justify text-justify pt-2 space-x-2">
                      <Checkbox id="terms" required />
                      <label htmlFor="terms" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        I agree to be responsible for the use of the equipment. If the equipment is lost, stolen,
                        destroyed or otherwise rendered inoperative through my neglect, I agree to reimburse the
                        Department of Food Science and Chemistry for the equipment at replacement value. If the
                        equipment is damaged, I agree to pay for its repair.
                      </label>
                    </div>
                  </div>
                </div>
                <div className="pt-5">
                  <Alert className='h-20 border-gray-300'>
                    <Bell className="h-4 w-4" />
                    <AlertTitle>Quick Reminder!</AlertTitle>
                    <AlertDescription className="text-sm">
                      The verification process may take longer than expected. Your patience and understanding is greatly appreciated.
                    </AlertDescription>
                  </Alert>
                </div>
                <div className='pt-4 flex justify-end'>
                  <Button className="mt-4 sm:mt-0 bg-[#9B151E]">Get Verified</Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default verification;
