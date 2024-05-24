import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from "@/components/ui/textarea"

const incident = () => {
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
                  />
                </div>
              </div>
              <div className='pt-6'>
                <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="desc-incident">
                  Incident Description
                </Label>
                <Textarea className="mt-2 h-40 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" id="desc-incident"/>
                <div className="grid grid-cols-2 gap-4 pt-4">
                <div>
                  <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="adviser">
                    Adviser
                  </Label>
                  <Input
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    id="adviser"
                    type="text"
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="project">
                    Proof of Incident
                  </Label>
                  <Input
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    id="picture-incident"
                    type="file"
                  />
                </div>
              </div>
              </div>
                <div className='pt-4 flex justify-end'>
                  <Button className="mt-4 sm:mt-0 bg-[#9B151E]">Submit Report</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
 
export default incident;
