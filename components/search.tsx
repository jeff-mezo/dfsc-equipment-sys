'use client'

import { SearchIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { useRouter } from 'next/navigation'
import { useDebounce } from 'use-debounce'

export const Search = () => {
    const router = useRouter();
    const [text, setText ] = useState('');
    const [query] = useDebounce(text, 500)


    useEffect( () => {
        if(!query){
            router.push(`/equipmentpage`)
        } else {
            router.push(`/equipmentpage?search?=${query}`)
        }
    }, [text, router])
    

  return (
    <div className="relative w-full sm:w-auto">
        <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
        <Input
            className="w-full rounded-md border border-gray-300 bg-white px-10 py-2 text-sm focus:border-[#9B151E] focus:ring-[#9B151E] dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50"
            placeholder="Search equipment..."
            type="search"
            onChange={e => setText(e.target.value)}
            value={text}
        />
    </div>
  )
}
