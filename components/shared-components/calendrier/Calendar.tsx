'use client';
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import { EventDropArg, EventInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';

import { useState, useRef, useEffect } from 'react';

import { Card, DialogTitle, Dialog, Tooltip } from '@mui/material';
import { ICalendarViewValue } from './types';
import { CalendarForm, StyledCalendar, CalendarToolbar } from './sections';
import useMediaMatch from '@rooks/use-media-match';

import dayjs from 'dayjs';
import EventDetails from './components/eventDetails/EventDetails';
import 'dayjs/locale/fr';
import { Button } from '@/components/ui/button';
import Loading from '@/app/loading';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getExamPlansByUserId, getStudentExamPlans } from '@/actions/exam-plans';
import { useParams } from 'next/navigation';
import { useDeleteExamPlan } from './hooks/useDeleteExamPlan';
import { useUpdateExamPlan } from './hooks/useUpdateExamPlan';

// ----------------------------------------------------------------------

const COLOR_OPTIONS = [
  {
    dark: '#FF2C6E',
    light: '#FFEBE9',
  },

  {
    dark: '#FF8743',
    light: '#FFF5D8',
  },

  {
    dark: '#00B8D9',
    light: '#DBF6FF',
  },

  {
    dark: '#12B76A',
    light: '#D8FEE5',
  },

  {
    dark: '#914AFF',
    light: '#E8D9FF',
  },

  {
    dark: '#939393',
    light: '#DDDDDD',
  },
];

interface CalendarProps {
  CalendarEditable?: boolean;
}

// ----------------------------------------------------------------------

export default function Calendar({ CalendarEditable }: CalendarProps) {
  const [loading, setLoading] = useState(false);
  const isDesktop = useMediaMatch('(min-width: 575px)');
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']) as any;
  const params = useParams();
  const { etab_id } = params;
  const user_id = user?.id;
  const calendarRef = useRef<FullCalendar>(null);

  const { data: events, isPending } = useQuery<any>({
    queryKey: ['events'],
    queryFn: async () => {
      if (CalendarEditable) return await getExamPlansByUserId(user_id, +etab_id);
      else return await getStudentExamPlans(user_id, +etab_id);
    },
  });

  const [openForm, setOpenForm] = useState(false);
  const [openEventDet, setOpenEventDet] = useState(false);

  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const [selectedRange, setSelectedRange] = useState<{
    start: Date;
    end: Date;
  } | null>(null);
  const selectedEvent = events?.find((event: any) => event.id === selectedEventId) as any;


  const [date, setDate] = useState(new Date());

  const [filterEventColor, setFilterEventColor] = useState<string[]>([]);

  const [view, setView] = useState<ICalendarViewValue>('dayGridMonth');
  const { deleteExamPlan } = useDeleteExamPlan();
  const { updateExamPlan } = useUpdateExamPlan();


  const handleOpenModal = (arg?: boolean) => {
    if (arg) {
      setOpenEventDet(true);
    } else {
      setOpenForm(true);
    }
  };

  const handleCloseModal = () => {
    setOpenForm(false);
    setSelectedRange(null);
    setSelectedEventId(null);
  };

  const handleClickToday = () => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.today();
      setDate(calendarApi.getDate());

    }
  };

  const handleChangeView = (newView: ICalendarViewValue) => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.changeView(newView);
      setView(newView);
    }
  };

  const handleClickDatePrev = () => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.prev();
      setDate(calendarApi.getDate());

    }
  };

  const handleClickDateNext = async () => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  };

  const handleSelectRange = (arg: any) => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.unselect();
    }

    setSelectedRange({
      start: arg.start,
      end: arg.end,
    });
    handleOpenModal();
  };

  const handleSelectEvent = (arg: any) => {
    setSelectedEventId(arg.event.id);
    handleOpenModal(true);
  };

  const handleDropEvent = ({ event }: EventDropArg) => {
    try {
      const selectedEvent = events?.find((el: any) => el.id === +event._def.publicId) as any;

      const startDate = dayjs(event._instance?.range.start).get('date');
      const startMonth = dayjs(event._instance?.range.start).get('month');
      const startYear = dayjs(event._instance?.range.start).get('year');
      const newStartDate = dayjs(selectedEvent?.start)
        .set('date', startDate)
        .set('month', startMonth)
        .set('year', startYear);
      const endDate = dayjs(event._instance?.range.end).get('date');
      const endMonth = dayjs(event._instance?.range.end).get('month');
      const endYear = dayjs(event._instance?.range.end).get('year');
      const newEndDate = dayjs(selectedEvent?.end)
        .set('date', endDate)
        .set('month', endMonth)
        .set('year', endYear);
      selectedEvent.start = newStartDate.toISOString();
      selectedEvent.end = newEndDate.toISOString();
      selectedEvent.subject = selectedEvent?.subject.id;

      const color = selectedEvent?.color;

      selectedEvent.color = color;
      delete selectedEvent.textColor;
      const selectedId = selectedEvent.id;
      const classesIds = selectedEvent.classes.map((classe: any) => classe.id);
      selectedEvent.classes = classesIds;
      updateExamPlan(selectedEvent);

    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteEvent = () => {
    try {
      if (selectedEventId) {
        handleCloseModal();
        deleteExamPlan(+selectedEventId);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterEventColor = (eventColor: any) => {
    setFilterEventColor(eventColor);
  };

  const handleResetFilter = () => {
    setFilterEventColor([]);
  };

  //@ts-ignore
  const dataFiltered = applyFilter({
    inputData: events,
    filterEventColor,
  });

  function renderEventContent(eventInfo: any) {
    const event = eventInfo.event._context.options.events.find(
      (event: any) => event.id === eventInfo.event.id
    );

    return (
      <Tooltip title={eventInfo.event.title}>
        <div
          className="event-cont"
          style={{
            backgroundColor: event?.textColor,
            borderLeft: event?.borderLeft,
          }}
        >
          <i
            className="event-cont-text"
            style={{
              display: 'block',
              overflow: 'hidden',
              color: event?.color,
            }}
          >
            {shortenString(eventInfo.event.title)}
          </i>
        </div>
      </Tooltip>
    );
  }

  return (
    <>
      <div className="flex flex-col w-full overflow-auto calendar p-9">
        <div className="page__header">
          <div className="page__header-left">
            <h2 className="text-2xl font-semibold page-title text-2">Calendrier</h2>
            {CalendarEditable && (
              <Button
                onClick={() => {
                  handleSelectRange({
                    start: new Date(),
                    end: new Date(),
                  });
                }}
                className="btn bg-2"
                type="button"
              >
                Planifier un examen
              </Button>
            )}
          </div>
        </div>
        <CalendarToolbar
          date={date}
          handleFilterEventColor={handleFilterEventColor}
          handleResetFilter={handleResetFilter}
          view={view}
          colorOptions={COLOR_OPTIONS}
          onNextDate={handleClickDateNext}
          onPrevDate={handleClickDatePrev}
          onToday={handleClickToday}
          onChangeView={handleChangeView}
        />
        <Card>
          <StyledCalendar>
            {loading ? (
              <Loading />
            ) : (
              <FullCalendar
                // {...calendarProps}
                weekends
                editable={CalendarEditable}
                droppable={CalendarEditable}
                locale={'fr'}
                selectable={CalendarEditable}
                rerenderDelay={10}
                allDayMaintainDuration
                eventResizableFromStart
                ref={calendarRef}
                initialDate={date}
                initialView={view}
                dayMaxEventRows={3}
                loading={(isLoading: boolean) => setLoading(isLoading)}
                eventDisplay="block"
                events={dataFiltered}
                headerToolbar={false}
                // initialEvents={events}
                select={handleSelectRange}
                eventDrop={handleDropEvent}
                dayHeaderFormat={{ weekday: isDesktop ? 'long' : 'narrow' }}
                eventClick={handleSelectEvent}
                eventContent={renderEventContent}
                height={'auto'}
                showNonCurrentDates={false}
                plugins={[
                  listPlugin,
                  dayGridPlugin,
                  timelinePlugin,
                  timeGridPlugin,
                  interactionPlugin,
                ]}
              />
            )}
          </StyledCalendar>
        </Card>
        <EventDetails
          openEventDet={openEventDet}
          setOpenEventDet={setOpenEventDet}
          setOpenForm={setOpenForm}
          eventId={selectedEventId}
          current={date}
          onDeleteEvent={handleDeleteEvent}
          setSelectedRange={setSelectedRange}
          setSelectedEventId={setSelectedEventId}
          editable = {CalendarEditable}
        />
        {openForm && (
          <Dialog
            fullWidth
            maxWidth="xs"
            style={{
              maxHeight: 'fit-content !important',
            }}
            open={openForm}
            onClose={handleCloseModal}
          >
            <DialogTitle padding={'16px 24px 5px 24px !important'}>
              <div className="dialog-title">
                <h2 className=" text-2">
                  {' '}
                  {selectedEvent ? 'Modifier un examen' : 'Planifier un examen'}
                </h2>
                {/* <h2> {selectedEvent ? 'Modifier un examen' : 'Planifier un examen'}</h2> */}
                <button onClick={handleCloseModal}>{/* <Cancel /> */}X</button>
              </div>
            </DialogTitle>
            <CalendarForm
              eventId={selectedEventId}
              range={selectedRange}
              onCancel={handleCloseModal}
              onDeleteEvent={handleDeleteEvent}
              colorOptions={COLOR_OPTIONS}
            />
          </Dialog>
        )}
      </div>
    </>
  );
}

function applyFilter({
  inputData,
  filterEventColor,
}: {
  inputData: EventInput[];
  filterEventColor: any[];
}) {
  if (filterEventColor.length > 0) {
    const filtered = inputData.filter((item: any) =>
      filterEventColor.some((el: any) => item.color === el.dark && item.textColor === el.light)
    );
    return filtered;
  }

  return inputData;
}

function shortenString(inputString: string) {
  if (inputString.length <= 12) {
    return inputString;
  } else {
    return inputString.substring(0, 12) + '...';
  }
}
