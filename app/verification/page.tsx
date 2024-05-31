"use client"
import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Checkbox } from "@/components/ui/checkbox"
import { Bell } from 'lucide-react';
import { createClient } from '@/utils/supabase/client'
import { handleFileUpload_Form5, handleFileUpload_Attendance, checkUserFileStatus } from '@/utils/clientActions'
import { useSession } from '@supabase/auth-helpers-react'

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

const Verification = () => {
  const session = useSession();
  const userId = session?.user?.id;
  const [fileStatus, setFileStatus] = useState({ prereq_Form5: false, prereq_Attendance: false });

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const status = await checkUserFileStatus(userId);
        setFileStatus(status);
      }
    };
    fetchData();
  }, [userId]);

  const handleFileChange = async (event, uploadHandler) => {
    const file = event.target.files[0];
    if (file) {
      await uploadHandler(file, userId);
      const status = await checkUserFileStatus(userId);
      setFileStatus(status);
    }
  };

  if (!userId) {
    return <div>Loading...</div>;
  }


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
                      UP Form 5 (Official Registration Form) {fileStatus.prereq_Form5 && <span>(Uploaded)</span>}
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
                      Certificate of Attendance Orientation {fileStatus.prereq_Attendance && <span>(Uploaded)</span>}
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

export default Verification;
