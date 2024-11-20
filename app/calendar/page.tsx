'use client'

import React, { useEffect, useState } from 'react'
import { supabase } from '@/config/supabaseClient'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'

 
export default function Calendar() {


  return (
    <div className="mx-auto py-10 pt-24 w-9/12">
     {/*<iframe className="mx-auto" style={{filter: 'hue-rotate(130deg)'}}src="https://calendar.google.com/calendar/embed?src=jpmezo%40up.edu.ph&ctz=Asia%2FManila" width="90%" height="80%" scrolling="no"></iframe> */}
    
     <FullCalendar
      plugins={[ 
        dayGridPlugin,
        timeGridPlugin
      ]}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      }}
      initialView="dayGridMonth"
      events={{}}
      nowIndicator={true}
      // eventClick={}
    />    
    </div>
  )
}
