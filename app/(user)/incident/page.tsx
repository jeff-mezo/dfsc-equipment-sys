//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/*
DEC 7 2024 PATCH NOTES:
- Replaced database cell hasProof to incidentReportFilename to allow searching in PDF viewer
- Replaced Incident Proof Label to Incedent Report Filename 
- incident page now receives filename from clientActions.ts thru incident upload handler

DEC 6 2024 PATCH NOTES:
- Added restriction to accept only pdf files
- Added checks if the user is logged in
- Added user session fetch to find userID currently logged in
- Added global variable isValidFileType for handleSubmit logic for incorrect file type

LINKED FILES:
- clientActions.ts
- useUser.tsx

WARNINGS:
- none

- Previous updates dev: interstellar-0614 (Jamze Reyno)
- Current updates dev: KanadeTachie (King Behimino)

^^^Change as necessary to track progress
*/ 
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

'use client' 
import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client'
import { ChangeEvent } from 'react';
import { supabase } from '@/config/supabaseClient'
import { handleFileUpload_Incident } from '@/utils/clientActions'
//import * as pdfjsLib from 'pdfjs-dist';
import useUser from '@/app/hook/useUser';

var isValidFileType = false;
const Incident = () => {
  const { isFetching, data } = useUser();
  const [userID, setUserId] = useState<string | null>(null);
  const [isValidFileType, setIsValidFileType] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    studentnum: '',
    degreeProg: '',
    email: '',
    eq_name: '',
    eq_code: '',
    date_incident: '',
    time_incident: '',
    description: '',
    adviser: '',
    incidentReportFilename: ''
  });

  useEffect(() => {
    if (data?.id) {
      setUserId(data.id);
    }
  }, [data]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const lettersFields = ['name', 'degreeProg', 'eq_name', 'adviser'];
    const charactersRegex = /^[A-Za-z\s\-./]*$/;
    const studentNumberRegex = /^[0-9\-]*$/;

    if (lettersFields.includes(name) && !charactersRegex.test(value)) {
      return;
    }
    if (name === 'studentnum' && !studentNumberRegex.test(value)) {
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    uploadHandler: (file: File, userID: string) => Promise<string | null>
  ) => {
    const file = event.target.files?.[0];
    
    if (!file) return;
    if (!userID) {
      alert('You are not logged in! Please log in first before uploading files.');
      return;
    }
    if (file.type !== 'application/pdf') {
      alert('Please upload only PDF files.');
      return;
    }

    try {
      const newFilename = await uploadHandler(file, userID);
      if (newFilename) {
        setFormData(prev => ({
          ...prev,
          incidentReportFilename: newFilename,
        }));
        setIsValidFileType(true);
      }
    } catch (error) {
      console.error('File Upload Failed:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!isValidFileType) {
      alert('Please upload a valid PDF file.');
      return;
    }

    try {
      const { error } = await supabase
        .from('incidentform')
        .insert([{ ...formData }]);

      if (error) throw error;

      alert('Incident report submitted successfully');
      setFormData({
        name: '',
        studentnum: '',
        degreeProg: '',
        email: '',
        eq_name: '',
        eq_code: '',
        date_incident: '',
        time_incident: '',
        description: '',
        adviser: '',
        incidentReportFilename: '',
      });
      setIsValidFileType(false);
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };

  if (isFetching) {
    return <div>Loading...</div>;
  }
  
    return ( 
        <div className="overflow-x-hidden max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 ">
            <div className="space-y-8 pt-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Incident Report</h1>
            <p className="mt-2 text-md text-gray-600 dark:text-gray-400">
                Please fill out this form to report an incident related to the usage of equipment.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Incident Information</h2>
            </div>
            <form onSubmit={handleSubmit}>

            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
            <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="name">
                    Name
                  </Label>
                  <Input
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    id="name"
                    type="text"
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="student-number">
                    Student Number
                  </Label>
                  <Input
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    id="student-number"
                    type="text"
                    name='studentnum'
                    value={formData.studentnum}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="degree-program">
                    Degree Program
                  </Label>
                  <Input
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    id="degree-program"
                    type="text"
                    name='degreeProg'
                    value={formData.degreeProg}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    id="email"
                    type="email"
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="equipment-name">
                    Equipment Name
                  </Label>
                  <Input
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    id="equipment-name"
                    type="text"
                    name='eq_name'
                    value={formData.eq_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="equipment-id">
                    Equipment ID
                  </Label>
                  <Input
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    id="equipment-id"
                    type="text"
                    name='eq_code'
                    value={formData.eq_code}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="date-incident">
                    Date of Incident
                  </Label>
                  <Input
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    id="date-incident"
                    type="date"
                    name='date_incident'
                    value={formData.date_incident}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="time-incident">
                    Time of Incident
                  </Label>
                  <Input
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    id="time-incident"
                    type="time"
                    name='time_incident'
                    value={formData.time_incident}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className='pt-6'>
                <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="desc-incident">
                  Incident Description
                </Label>
                <Textarea className="mt-2 h-40 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" id="desc-incident" name='description'  value={formData.description}
                  onChange={handleChange} required/>
                <div className="grid grid-cols-2 gap-4 pt-4">
                <div>
                  <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="adviser">
                    Adviser
                  </Label>
                  <Input
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    id="adviser"
                    type="text"
                    name='adviser'
                    value={formData.adviser}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="proof-incident">
                    Proof of Incident
                  </Label>
                  <Input
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    id="picture-incident"
                    type="file"
                    onChange={(event) => handleFileChange(event, handleFileUpload_Incident)}
                  />
                </div>
              </div>
              </div>
                <div className='pt-4 flex justify-end'>
                  <Button className="mt-4 sm:mt-0 bg-[#9B151E]">Submit Report</Button>
                </div>
              </div>
            </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
 
export default Incident;
