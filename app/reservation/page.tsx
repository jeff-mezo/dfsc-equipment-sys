import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ClipboardCheckIcon, ClipboardX } from 'lucide-react'

const Reservation = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:pt-20">
      <div className="space-y-8 pt-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Reservation Form</h1>
          <p className="mt-2 text-md text-gray-600 dark:text-gray-400">
            Review your cart and complete your rental order.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Equipment in Cart</h2>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700">
            <dl>
              <div className="bg-gray-50 dark:bg-gray-900 px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Equipment</dt>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</dt>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Borrow Date</dt>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Return Date</dt>
              </div>
              <div className="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
                <dd className="text-sm text-gray-900 dark:text-gray-100">Microscope</dd>
                <div className="flex items-center">
                  <Input
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    type="text"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <Input
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      type="datetime-local"
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      type="datetime-local"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
                <dd className="text-sm text-gray-900 dark:text-gray-100">Centrifuge</dd>
                <div className="flex items-center">
                  <Input
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    type="text"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <Input
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      type="datetime-local"
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      type="datetime-local"
                    />
                  </div>
                </div>
              </div>
            </dl>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Borrower Information</h2>
          </div>
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
                <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="project">
                  Project
                </Label>
                <Input
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  id="project"
                  type="text"
                />
              </div>
            </div>
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
            <div className="bg-gray-50 dark:bg-gray-900 px-4 py-5 sm:flex sm:items-center sm:justify-between sm:px-6">
              <div className="flex items-center">
                <ClipboardCheckIcon className="h-5 w-5 text-green-500" />
                <span className="ml-2 text-sm font-medium text-green-500">Certified to Use</span>
              </div>
              <div className="flex items-center">
                <ClipboardX className="h-5 w-5 text-red-500" />
                <span className="ml-2 text-sm font-medium text-red-500">Permit to Use</span>
              </div>
              <Button className="mt-4 sm:mt-0 bg-[#9B151E]">Complete Checkout</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reservation