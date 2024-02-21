import { Dialog, DialogTitle, Switch } from '@mui/material';
import React, { useState } from 'react';
import { Dropdown, Menu, MenuProps, Modal, message } from 'antd';
// import Item from 'antd/es/list/Item';
// import DropdownButton from 'antd/es/dropdown/dropdown-button';
import dayjs from 'dayjs';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
function EventDetails({
  setSelectedRange,
  setSelectedEventId,
  onDeleteEvent,
  setOpenEventDet,
  openEventDet,
  eventId,
  current,
  setOpenForm,
}: any) {
  // const event = useAppSelector((state) => state.calendar.events).find(
  //   (event: any) => event.id === eventId
  // );
  const queryClient = useQueryClient()
  const events = queryClient.getQueryData(['events']) as any; 
  const event = events?.find((event:any) => event.id === +eventId)
  // console.log(eventId);
  // console.log(events);
  // console.log(event);
  // console.log(current);

  // const event = {
  //   title: 'event',
  //   start: '2024-02-05',
  //   end: '2024-02-06',
  //   color: { light: 'pink', dark: 'blue' },
  //   studentsVisibility: true,
  //   description: 'souhail brahmi',
  //   classes: ["3 eme info", "bac"],
  //   subject: {name: 'math'},
  // };
  const [deleteForm, setDeleteForm] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpenChange = () => {
    setOpen(!open);
  };
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <button
          onClick={() => {
            setOpenEventDet(false);
            setOpen(false);
            setOpenForm(true);
          }}
        >
          Modifier
        </button>
      ),
    },
    {
      key: '2',
      label: (
        <button
          onClick={() => {
            setOpenEventDet(false);
            setOpen(false);
            setDeleteForm(true);
          }}
        >
          Supprimer
        </button>
      ),
    },
  ];
  const switchChange = (checked: any) => {
    // dispatch(patchEvent({ id: event.id, body: { studentsVisibility: checked.target.checked } }))
    //   .unwrap()
    //   .then(() => {
    //     dispatch(
    //       getEvents({
    //         //@ts-ignore
    //         startDate: dayjs(current).startOf('month').toISOString(),
    //         //@ts-ignore
    //         endDate: dayjs(current).endOf('month').toISOString(),
    //       })
    //     );
    //     message.success(
    //       checked.target.checked
    //         ? "la date de l'examen est désormais visible pour les étudiants"
    //         : "la date de l'examen est désormais invisible pour les étudiants"
    //     );
    //   })
    //   .catch((err: any) => {
    //     console.error(err);
    //     message.error("la visibilité n'est pas mis à jour");
    //   });
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
              <i className="event-cont-text" >
                {event?.title}
              </i>
            </div>
            <Dropdown
              placement="bottomLeft"
              onOpenChange={handleOpenChange}
              open={open}
              menu={{ items }}
              trigger={['click']}
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                {/* <Dots /> */}
                {/* dots */}
                <Image src="/burrgermenuicon.svg" height={20} width={20} alt="dots" />
              </button>
            </Dropdown>
          </div>
        </DialogTitle>
        <div className="details-event">
          <p className="details-event-date">
            à {dayjs(event?.start).format('hh:mm')} - Durée:{date}
          </p>
          <span className="details-event-det">
            <p className="details-event-date">Visibilité</p>

            <Switch defaultChecked={event?.studentsVisibility} onChange={switchChange} />
          </span>

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
      <Modal
        title="Supprimer cet examen"
        open={deleteForm}
        onCancel={() => {
          setDeleteForm(false);
        }}
        footer={null}
        closeIcon={<CloseCircleOutlined width="26.49px !important" height="26.49px !important" />}
        style={{
          height: '265px',
          zIndex: '9999',
          padding: ' 30px 40px',
          gap: '45px',
          borderRadius: '12px',
        }}
      >
        <div className="archive-exam-popup-content">
          <div className="archive-exam-popup-message">
            Êtes-vous sûr de vouloir supprimer cet examen ? Il sera définitivement invisible pour
            vous et vos étudiants.
          </div>
          <div className="archive-exam-popup-buttons">
            <button
              className="btn white-btn btn-cancel"
              onClick={() => {
                setDeleteForm(false);
              }}
            >
              Annuler
            </button>
            <button
              className="btn  red btn-delete "
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
      </Modal>
    </>
  );
}

export default EventDetails;
