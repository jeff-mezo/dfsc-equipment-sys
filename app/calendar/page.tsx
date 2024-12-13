//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/*
DEC 14 2024 PATCH NOTES:
- Calendar now works

- Previous updates dev: KanadeTachie (King Behimino)
- Current updates dev: KanadeTachie (King Behimino)

^^^Change as necessary to track progress
*/ 
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
'use client';

import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { fetchReservations } from '@/utils/clientActions';
import { EventInput } from '@fullcalendar/core';

export default function Calendar() {
  const [events, setEvents] = useState<EventInput[]>([]);

  useEffect(() => {
    async function loadReservations() {
      try {
        const reservations = await fetchReservations();
        setEvents(reservations); // Set events with name and email data
      } catch (error) {
        console.error('Error loading reservations:', error);
      }
    }
    loadReservations(); // Fetch reservations on mount
  }, []);

  return (
    <div className="mx-auto py-10 pt-24 w-9/12">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        initialView="dayGridMonth"
        events={events} // Pass events to calendar
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          meridiem: true,
        }}
        nowIndicator={true}
        eventColor='maroon'
        eventClick={(info) => {
          alert(`Item Reserved: ${info.event.title}`);
        }}
      />
    </div>
  );
}
