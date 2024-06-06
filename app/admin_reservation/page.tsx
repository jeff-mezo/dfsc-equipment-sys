import React, { useEffect, useState } from 'react'
import { supabase } from '@/config/supabaseClient'
import { DataTable } from '@/app/admin_reservation/components/reservation-data-table'
import { Reservation, columns } from "./components/reservation-columns"

 
// async function getData(): Promise<Reservation[]> {
//   // Fetch data from your API here.
//   return [
//     {
//         name: "Jeffer Mezo",
//         email: "m@example.com",
//         eq_name: "Compound Microscope" ,
//         quantity: 1,
//         borrow_date: "7/05/23",
//         return_date: "14/05/23",
//         status: "Approved",
//     },

//     {
//         name: "Jeffrey Mezo",
//         email: "m@example.com",
//         eq_name: "OVENMO", 
//         quantity: 1,
//         borrow_date: "21/05/23",
//         return_date: "28/05/23",
//         status: "Denied",
//     },
        
//     // ...
//   ]
// }
 
const DemoPage = async () => {
  //const data = await getData()
  const { data, error } = await supabase.from('reservationform').select();
  console.log(data)
 
  if (error) {
    console.error(error);
    return <div>Error loading data</div>;
  }

  return (
    <div className="container mx-auto py-10 pt-24">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
export default DemoPage
