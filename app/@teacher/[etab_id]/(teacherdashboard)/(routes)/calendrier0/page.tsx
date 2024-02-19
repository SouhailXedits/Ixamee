'use client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import React from 'react';
// import { render } from '@fullcalendar/core/preact.js'

export default function Calendar() {
  function handleDateClick(arg: any) {
    alert(arg.dateStr);
  }
  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
      dateClick={handleDateClick}
      events[
        { title: 'event 1', date: '2024-02-05' },
        { title: 'event 2', date: '2024-02-02' },
      ]={}
      eventContent={renderEventContent}
    />
  );
}

function renderEventContent(eventInfo:any) {
  return (
    <>
      <b className="fc-event-time text-red">{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
