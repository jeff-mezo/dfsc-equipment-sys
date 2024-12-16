//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/*
DEC 17 2024
- Calendar reworked
- Added css styling for tippy for calendar but not used (dont know how frontend globals.css works)

- Previous updates dev: KanadeTachie (King Behimino)
- Current updates dev: KanadeTachie (King Behimino)

^^^Change as necessary to track progress
*/ 
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
'use client';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css'; // Default Tippy styles
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
        events={events}
        eventTimeFormat={{
        hour: '2-digit',
        minute: '2-digit',
        meridiem: true,
        }}
        nowIndicator={true}
        eventColor="maroon"
        eventOverlap
        eventClick={(info) => {
          const { title, extendedProps } = info.event;
          alert(`
            Item Reserved: ${title}
            Borrower Name: ${extendedProps.borrowerName|| ''}
            Degree Program: ${extendedProps.degprog || ' '}
            Email: ${extendedProps.email || ' '}
            Borrow Date and Time: ${extendedProps.borrowDate || ' '}
            Return Date and Time: ${extendedProps.returnDate || ' '}
            Admin Privilege: ${extendedProps.isAdmin|| ' '}

          `);
        }}
        eventDidMount={(info) => {
          const { borrowerName, email, degprog, isAdmin, borrowDate, returnDate, eq} = info.event.extendedProps;
      
          tippy(info.el, {
            content: `
              <strong>Equipment: </strong> ${eq}<br>
              <strong>Borrower:</strong> ${borrowerName}<br>
              <strong>Program:</strong> ${degprog}<br>
              <strong>Email:</strong> ${email}<br>
              <strong>Borrow date and Time: </strong> ${borrowDate}<br>
              <strong>Return date and Time: </strong> ${returnDate}<br>
              <strong>Admin Privilege:</strong> ${isAdmin}
            `,
            allowHTML: true, // Enable HTML for rich tooltips
            theme: 'light-border',
          });
        }}
      />
    </div>
  );
  
}

