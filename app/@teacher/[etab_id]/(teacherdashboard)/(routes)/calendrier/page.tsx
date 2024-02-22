'use client';
import React, { useCallback } from 'react';
//@ts-ignore
import FullCalendar from '@fullcalendar/react';
//@ts-ignore
import { EventDropArg, EventInput } from '@fullcalendar/core';
//@ts-ignore
import interactionPlugin from '@fullcalendar/interaction';
//@ts-ignore
import listPlugin from '@fullcalendar/list';
//@ts-ignore
import dayGridPlugin from '@fullcalendar/daygrid';
//@ts-ignore
import timeGridPlugin from '@fullcalendar/timegrid';
//@ts-ignore
import timelinePlugin from '@fullcalendar/timeline';

import { useState, useRef, useEffect } from 'react';

// import { ReactComponent as Cancel } from '../../assets/icons/cancel.svg';

import { Card, DialogTitle, Dialog, Tooltip } from '@mui/material';

import { ICalendarViewValue } from './types';

import { CalendarForm, StyledCalendar, CalendarToolbar } from './sections';

// import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import useMediaMatch from '@rooks/use-media-match';

// import {
//   createEvent,
//   deleteEvent,
//   deleteEvents,
//   emptyEvents,
//   getEvents,
//   patchEvent,
//   postEvent,
//   updateEvent,
// } from '../../data/slices/calendarSlice';
import dayjs from 'dayjs';

// import Button from '../Bulletin/components/StudentBulletin/components/button/Button';
import EventDetails from './components/eventDetails/EventDetails';
import 'dayjs/locale/fr';
import { Button } from '@/components/ui/button';
import Loading from '@/app/loading';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getExamPlansByUserId } from '@/actions/exam-plans';
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

// ----------------------------------------------------------------------

export default function Calendar() {
  // const events = [
  //   {
  //     id: '11',
  //     title: 'Eventt 1',
  //     start: '2024-02-05T08:00:00',
  //     end: '2024-02-08T10:00:00',
  //     color: '#FF2C6E',
  //     textColor: '#FFEBE9',
  //     subject: { _id: 1, name: 'souuhail' },
  //   },
  //   {
  //     id: '2',
  //     title: 'Event 2',
  //     start: '2024-02-02T10:00:00',
  //     end: '2024-02-02T12:00:00',
  //     color: '#FF8743',
  //     textColor: '#FFF5D8',
  //     subject: { _id: 1, name: 'souhail' },
  //   },
  //   // Add more events as needed
  // ];
  // const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const isDesktop = useMediaMatch('(min-width: 575px)');
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']) as any;
  const params = useParams();
  const { etab_id } = params;
  const user_id = user?.id;
  const calendarRef = useRef<FullCalendar>(null);
  // let events: any = useGetEvents(setLoading);
  const { data: events, isPending } = useQuery<any>({
    queryKey: ['events'],
    queryFn: async () => await getExamPlansByUserId(user_id, +etab_id),
  });
  console.log(events);

  const [openForm, setOpenForm] = useState(false);
  const [openEventDet, setOpenEventDet] = useState(false);

  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  console.log(selectedEventId);

  const [selectedRange, setSelectedRange] = useState<{
    start: Date;
    end: Date;
  } | null>(null);
  const selectedEvent = events?.find((event: any) => event.id === selectedEventId) as any;
  console.log(selectedEvent);

  // const selectedEvent = useAppSelector(() => {
  //   if (selectedEventId) {
  //     return events.find((event: any) => event.id === selectedEventId);
  //   }

  //   return null;
  // });

  // const picker = useDateRangePicker(null, null);

  const [date, setDate] = useState(new Date());

  const [filterEventColor, setFilterEventColor] = useState<string[]>([]);

  const [view, setView] = useState<ICalendarViewValue>('dayGridMonth');
  const { deleteExamPlan } = useDeleteExamPlan();
  const { updateExamPlan } = useUpdateExamPlan();

  // useEffect(() => {
  //   return () => dispatch(emptyEvents());
  // }, []);
  // useEffect(() => {
  //   const calendarEl = calendarRef.current;

  //   if (calendarEl) {
  //     const calendarApi = calendarEl.getApi();

  //     const newView = isDesktop ? 'dayGridMonth' : 'listMonth';
  //     calendarApi.changeView(newView);
  //     setView(newView);
  //   }
  // }, [isDesktop]);

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
      // dispatch(emptyEvents());
      calendarApi.today();
      setDate(calendarApi.getDate());

      // dispatch(
      //   getEvents({
      //     //@ts-ignore
      //     startDate: dayjs(calendarApi.getDate()).startOf('month').toISOString(),
      //     //@ts-ignore
      //     endDate: dayjs(calendarApi.getDate()).endOf('month').toISOString(),
      //   })
      // );
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
      // dispatch(emptyEvents());
      calendarApi.prev();
      setDate(calendarApi.getDate());

      // dispatch(
      //   getEvents({
      //     //@ts-ignore
      //     startDate: dayjs(calendarApi.getDate()).startOf('month').toISOString(),
      //     //@ts-ignore
      //     endDate: dayjs(calendarApi.getDate()).endOf('month').toISOString(),
      //   })
      // );
    }
  };

  const handleClickDateNext = async () => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      // await dispatch(emptyEvents());
      calendarApi.next();
      setDate(calendarApi.getDate());
      console.log(calendarApi.getDate());

      // dispatch(
      //   getEvents({
      //     //@ts-ignore
      //     startDate: dayjs(calendarApi.getDate()).startOf('month').toISOString(),
      //     //@ts-ignore
      //     endDate: dayjs(calendarApi.getDate()).endOf('month').toISOString(),
      //   })
      // );
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
      console.log(event);
      const selectedEvent = events?.find((el: any) => el.id === +event._def.publicId) as any;
      console.log(selectedEvent);

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

      const color = selectedEvent?.color

      selectedEvent.color = color;
      delete selectedEvent.textColor;
      console.log(selectedEvent);
      const selectedId = selectedEvent.id;
      console.log(selectedId);
      const classesIds = selectedEvent.classes.map((classe:any) => classe.id);
      selectedEvent.classes = classesIds

      updateExamPlan(selectedEvent);

      // dispatch(
      //   patchEvent({
      //     id: event.id,
      //     body: selectedEvent,
      //   })
      // )
      //   .unwrap()
      //   .then(async () => {
      //     await dispatch(
      //       updateEvent({
      //         selectedEventId: event.id,
      //         newEvent: selectedEvent,
      //       })
      //     );

      //     dispatch(
      //       getEvents({
      //         //@ts-ignore
      //         startDate: dayjs(date).startOf('month').toISOString(),
      //         //@ts-ignore
      //         endDate: dayjs(date).endOf('month').toISOString(),
      //       })
      //     );
      //     message.success('événement mis à jour avec succès');
      //   })
      //   .catch((err: any) => {
      //     console.error(err);
      //     message.error("l'événement n'a pas été mis à jour");
      //   });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateUpdateEvent = async (newEvent: any) => {
    if (selectedEventId) {
      // dispatch(
      //   updateEvent({
      //     selectedEventId,
      //     newEvent,
      //   })
      // );

      newEvent.classes = newEvent?.classes?.map((event: any) => event.value);
      newEvent.subject = newEvent?.subject?._id || newEvent?.subject?.value || newEvent.subject;

      // dispatch(
      //   patchEvent({
      //     id: selectedEventId,
      //     body: newEvent,
      //   })
      // )
      //   .unwrap()
      //   .then(() => {
      //     dispatch(
      //       updateEvent({
      //         selectedEventId: selectedEventId,
      //         newEvent,
      //       })
      //     );

      //     dispatch(
      //       getEvents({
      //         //@ts-ignore
      //         startDate: dayjs(date).startOf('month').toISOString(),
      //         //@ts-ignore
      //         endDate: dayjs(date).endOf('month').toISOString(),
      //       })
      //     );
      //     message.success('événement mis à jour avec succès');
      //   })
      //   .catch((err: any) => {
      //     console.error(err);
      //     message.error("l'événement n'a pas été mis à jour");
      //   });
    } else {
      // await dispatch(
      //   createEvent({
      //     newEvent,
      //   })
      // );
      newEvent.classes = newEvent.classes.map((event: any) => event.value);
      newEvent.subject = newEvent.subject.value;

      // dispatch(postEvent(newEvent))
      //   .unwrap()
      //   .then(() => {
      //     dispatch(
      //       getEvents({
      //         //@ts-ignore
      //         startDate: dayjs(date).startOf('month').toISOString(),
      //         //@ts-ignore
      //         endDate: dayjs(date).endOf('month').toISOString(),
      //       })
      //     );
      //   })
      //   .catch((err: string) => {
      //     console.error(err);
      //   });
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
    console.log(eventInfo);

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
      <div className="calendar">
        <div className="page__header">
          <div className="page__header-left">
            <h2 className="page-title">Calendrier</h2>
            <Button
              onClick={() => {
                handleSelectRange({
                  start: new Date(),
                  end: new Date(),
                });
              }}
              className="btn"
              type="button"
            >
              Planifier un examen
            </Button>
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
                weekends
                editable
                droppable
                locale={'fr'}
                selectable
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
                <h2 className=' text-2'> {selectedEvent ? 'Modifier un examen' : 'Planifier un examen'}</h2>
                {/* <h2> {selectedEvent ? 'Modifier un examen' : 'Planifier un examen'}</h2> */}
                <button onClick={handleCloseModal}>{/* <Cancel /> */}X</button>
              </div>
            </DialogTitle>
            <CalendarForm
              eventId={selectedEventId}
              range={selectedRange}
              onCancel={handleCloseModal}
              onCreateUpdateEvent={handleCreateUpdateEvent}
              onDeleteEvent={handleDeleteEvent}
              colorOptions={COLOR_OPTIONS}
            />
          </Dialog>
        )}
      </div>
    </>
  );
}

// ----------------------------------------------------------------------

const useGetEvents = (setLoading: any) => {
  // const dispatch = useAppDispatch();

  // const { events: data } = useAppSelector((state) => state?.calendar);

  const getAllEvents = useCallback(async () => {
    // setLoading(true);
    // await dispatch(
    //   getEvents({
    //     //@ts-ignore
    //     startDate: dayjs(new Date()).startOf('month').toISOString(),
    //     //@ts-ignore
    //     endDate: dayjs(new Date()).endOf('month').toISOString(),
    //   })
    // ).then(() => {
    //   setLoading(false);
    // });
  }, []);

  useEffect(() => {
    getAllEvents();
  }, [getAllEvents]);

  const events = [
    { title: 'event 1', date: '2024-02-05' },
    { title: 'event 2', date: '2024-02-02' },
  ];
  // const events = data?.map((event: any) => ({
  //   ...event,
  //   textColor: event?.color?.light,
  //   color: event?.color?.dark,
  //   borderLeft: ` 6px solid ${event?.color?.dark}`,
  // }));

  return events;
};

// ----------------------------------------------------------------------

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
