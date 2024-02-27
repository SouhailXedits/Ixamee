import { Dialog, DialogContent, DialogTitle, Switch } from '@mui/material';
import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import dayjs from 'dayjs';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { DialogHeader } from '@/components/ui/dialog';
import { useUpdateExamPlan } from '../../hooks/useUpdateExamPlan';
function EventDetails({
  setSelectedRange,
  setSelectedEventId,
  onDeleteEvent,
  setOpenEventDet,
  openEventDet,
  eventId,
  current,
  setOpenForm,
  editable
}: any) {
  // const event = useAppSelector((state) => state.calendar.events).find(
  //   (event: any) => event.id === eventId
  // );
  const queryClient = useQueryClient();
  const events = queryClient.getQueryData(['events']) as any;
  const event = events?.find((event: any) => event.id === +eventId);

  const { updateExamPlan } = useUpdateExamPlan();

  const [deleteForm, setDeleteForm] = useState(false);
  const [open, setOpen] = useState(false);

  const switchChange = (checked: any) => {
    const classesIds = event?.classes.map((el: any) => el.id);
    const subjectId = event?.subject.id;
    const newEvent = {
      ...event,
      studentsVisibility: checked.target.checked,
      classes: classesIds,
      subject: subjectId,
    };
    updateExamPlan(newEvent);
  };
  const date1 = dayjs(event?.start);
  const date2 = dayjs(event?.end);
  const diff = date2.diff(date1, 'minute');
  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;

  const date = `${hours}h ${minutes}m`;

  return (
    <>
      <Dialog
        maxWidth="xs"
        style={{ maxHeight: 'fit-content !important' }}
        open={openEventDet}
        onClose={() => {
          setOpenEventDet(false);
          setSelectedRange(null);
          setSelectedEventId(null);
        }}
      >
        <DialogTitle padding={'16px 24px 5px 24px !important'}>
          <div className="dialog-title">
            <div
              className="event-cont"
              style={{
                backgroundColor: event?.color?.light,
                borderLeft: `6px solid ${event?.color?.dark}`,
                width: 'fit-content',
                paddingRight: '2rem',
              }}
            >
              {/* <i className="event-cont-text" style={{ color: event?.color }}> */}
              <i className="event-cont-text">{event?.title}</i>
            </div>
            {editable && 
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button name="bnt" variant="ghost" className="w-8 h-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" >
                <DropdownMenuItem
                  onClick={() => {
                    setOpenEventDet(false);
                    setOpen(false);
                    setDeleteForm(true);
                  }}
                >
                  <p>Supprimer</p>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setOpenEventDet(false);
                    setOpen(false);
                    setOpenForm(true);
                  }}
                >
                  Modifier
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            }
          </div>
        </DialogTitle>
        <div className="details-event">
          <p className="details-event-date">
            à {dayjs(event?.start).format('hh:mm')} - Durée:{date}
          </p>
          {editable &&
          <span className="details-event-det">
            <p className="details-event-date">Visibilité</p>

            <Switch defaultChecked={event?.studentsVisibility} onChange={switchChange} />
          </span>
          }

          <span className="details-event-det">
            Matière:
            <p className="details-event-date">{event?.subject?.name}</p>
          </span>
          <span className="details-event-det">
            Classe:
            <p className="details-event-date">
              {event?.classes?.map((el: any) => el?.name).join(' , ')}
            </p>
          </span>

          <p className="details-event-date">
            <span className="details-event-det" style={{ float: 'left', display: 'contents' }}>
              Description:
            </span>
            {event?.description}
          </p>
        </div>
      </Dialog>

      <Dialog title="Supprimer cet examen" open={deleteForm}>
        <DialogContent className=" flex flex-col gap-4">
          <DialogHeader className=" text-xl text-2">Supprimer cet examen</DialogHeader>
          <div className="archive-exam-popup-content flex flex-col gap-4">
            <div className="archive-exam-popup-message">
              Êtes-vous sûr de vouloir supprimer cet examen ? Il sera définitivement invisible pour
              vous et vos étudiants.
            </div>
            <div className="archive-exam-popup-buttons flex gap-2">
              <button
                className="btn white-btn btn-cancel w-full border rounded-lg"
                onClick={() => {
                  setDeleteForm(false);
                }}
              >
                Annuler
              </button>
              <button
                className="btn  red btn-delete w-full "
                onClick={() => {
                  onDeleteEvent();
                  setDeleteForm(false);
                  setSelectedRange(null);
                  setSelectedEventId(null);
                }}
              >
                Supprimer
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default EventDetails;
