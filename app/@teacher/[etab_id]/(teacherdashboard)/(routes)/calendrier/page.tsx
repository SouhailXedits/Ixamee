import React, { useCallback, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import { Card, DialogTitle, Dialog, Tooltip } from '@mui/material';
import { Button } from '@/components/ui/button';
import Loading from '@/app/loading';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getExamPlansByUserId } from '@/actions/exam-plans';
import { useParams } from 'next/navigation';
import { useDeleteExamPlan } from './hooks/useDeleteExamPlan';
import { useUpdateExamPlan } from './hooks/useUpdateExamPlan';

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

const Calendar = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']) as any;
  const params = useParams();
  const { etab_id } = params;
  const user_id = user?.id;
  const calendarRef = useRef<FullCalendar>(null);
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [openEventDet, setOpenEventDet] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [selectedRange, setSelectedRange] = useState<{ start: Date; end: Date } | null>(null);
  const { data: events, isPending } = useQuery<any>({
    queryKey: ['events'],
    queryFn: async () => await getExamPlansByUserId(user_id, +etab_id),
  });

  const selectedEvent = events?.find((event: any) => event.id === selectedEventId) as any;

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

  const handleSelectRange = (arg: any) => {
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

      const color = selectedEvent?.color

      selectedEvent.color = color;
      delete selectedEvent.textColor;

      updateExamPlan(selectedEvent);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateUpdateEvent = async (newEvent: any) => {
    if (selectedEventId) {
      newEvent.classes = newEvent?.classes?.map((event: any) => event.value);
      newEvent.subject = newEvent?.subject?._id || newEvent?.subject?.value || newEvent.subject;

      updateExamPlan(newEvent);
    } else {
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
      //
