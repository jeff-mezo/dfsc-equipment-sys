import React, { useEffect, useState } from 'react'
import { supabase } from '@/config/supabaseClient'
import { DataTable } from '@/app/admin_incident/components/incident-data-table'
import { Incident, columns } from "./components/incident-columns"


async function getData(): Promise<Incident[]> {
    // Fetch data from your API here.
    return [
      {
        user: "Jeffer Mezo",
        email: "m@example.com",
        equipment: "Compound Microscope",
        description: "Welding machine overheated, resulting in a small fire.",
        reported_date: "7/05/23",
        status: "Pending",
      },

      {
        user: "Jeffrey Mezo",
        email: "m@example.com",
        equipment: "Vortex Mixer",
        description: "Drill press stopped working mid-use, causing delay in production.",
        reported_date: "7/27/23",
        status: "Resolved",
      },

    ]
  }
   
  export default async function DemoPage() {
    const data = await getData()
   
    return (
      <div className="container mx-auto py-10 pt-24">
        <DataTable columns={columns} data={data} />
      </div>
    )
  }
