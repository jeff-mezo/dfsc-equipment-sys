'use client' 
import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from "@/components/ui/textarea"
import useIncident from '@/app/hook/useIncident'
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client'
import { ChangeEvent } from 'react';
import { supabase } from '@/config/supabaseClient'
import { handleFileUpload_Incident } from '@/utils/clientActions'

const incident = () => {
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
    proofIncident: undefined // Initialize proofIncident to null
});

const handleChange = (e:any) => {
  const { name, value } = e.target;
  const newValue = name === 'file' ? e.target.files[0] : value;
  setFormData({ ...formData, [name]: newValue });
};

const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>, uploadHandler: (file: File) => Promise<void>) => {
  const file = event.target.files?.[0];
  if (file) {
    await uploadHandler(file);
  }
};


const handleSubmit = async (e:any) => {
    console.log("submitting..")
    e.preventDefault();

    const hasProof = formData.proofIncident !== null;

    const { error } = await supabase.from('incidentform').insert(formData);
        // .insert([{
        //     name: formData.name,
        //     studentnum: formData.studentnum,
        //     degreeProg: formData.degreeProg,
        //     email: formData.email,
        //     eq_name: formData.eq_name,
        //     eq_code: formData.eq_code,
        //     date_incident: formData.date_incident,
        //     time_incident: formData.time_incident,
        //     description: formData.description,
        //     adviser: formData.adviser,
        //     proofIncident: null, // Set proofIncident to null
        //     hasProof: hasProof // Set hasProof based on whether proofIncident is present
        // }]);

    if (error) {
        console.error('Error inserting data:', error);
    } else {
        alert('Incident report submitted successfully');
        // Optionally, you can reset the form after successful submission
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
            proofIncident: undefined // Reset proofIncident to null
        });
    }
};

    return ( 
        <div className="overflow-x-hidden max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:pt-20">
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
                    type="text"
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
                    name='proofIncident'
                    value = {formData.proofIncident}
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
 
export default incident;
