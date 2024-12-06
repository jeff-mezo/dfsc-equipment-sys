import React, { useEffect, useState } from 'react'
import { supabase } from '@/config/supabaseClient'
import { revalidatePath } from "next/cache";
import { IncidentDataTable } from '@/app/admin_incident/components/incident-data-table'
import { Incident, incident_columns } from "@/app/admin_incident/components/incident-columns"

const Incidentreport = async () => {
  revalidatePath("/admin_incident")
  const { data: incidentData, error: incidentError} = await supabase.from('incidentform').select('*');
  if (incidentError) {
    console.error({incidentError });
    return <div>Error loading data</div>;
  }
  return (
      
    <div className="container mx-auto py-10 pt-24">
      <IncidentDataTable columns={incident_columns} data={incidentData} />
    </div>
  )
}
 
export default Incidentreport;
