// @ts-nocheck
'use client';
import { Formik, Form } from 'formik';
import React, { useEffect, useState } from 'react';
// import Button from '../../Bulletin/components/StudentBulletin/components/button/Button';
import Input from '../components/input/Input';
// import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
// import { fetchClassList, fetchSubjectsByClasses } from '../../../data/slices/calendarSlice';
import { ColorSinglePicker } from '../components/color-utils';
import 'flatpickr/dist/themes/material_green.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import DurationPicker from '../components/duationPicker/DurationPicker';
// import { ReactComponent as Trash } from '../../../assets/icons/trash.svg';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import useValidationscategorySchema from './eventSchema';
import AsyncSelect from '../components/asyncSelect/AsyncSelect';
import { Button } from '@/components/ui/button';

function CalendarForm({
  eventId,
  range,
  onCancel,
  onCreateUpdateEvent,
  Prefix,
  height = '46px',
  colorOptions,
  topMenu = false,
}: any) {
  // const event = useAppSelector((state) => state.calendar.events).find(
  //   (event) => event.id === eventId
  // );
  const event = {
    id: 1,
    title: 'event 1',
    start: '2024-02-05',
    end: '2024-02-05',
    color: 'purple',
    textColor: 'white',
    classes: [{ name: 'class 1', _id: '1' }],
    subject: { name: 'subject 1', _id: '1' },
    studentsVisibility: true,
    establishment: '1',
  };

  // const dispatch = useAppDispatch();
  const eventValidation = useValidationscategorySchema();

  const initialValues = {
    title: event ? event?.title : '',
    start: event ? event?.start : range?.start.toISOString(),
    end: event ? event?.end : dayjs(range?.start).add(2, 'hour').toISOString(),
    color: event ? event?.color : '',
    classes: event ? event?.classes?.map((el: any) => ({ label: el?.name, value: el?._id })) : [],
    subject: event ? { label: event?.subject?.name, value: event?.subject?._id } : '',
    description: event ? event?.description : '',
    studentsVisibility: event ? event?.studentsVisibility : false,
    establishment: event ? event?.establishment : '',
  };
  const submitHandler = async (values: any) => {
    // const activeEstablishmentId = localStorage.getItem('activeEstablishmentId');
    // values.establishment = activeEstablishmentId;
    // try {
    //   await onCreateUpdateEvent(values);
    //   onCancel();
    // } catch (error) {
    //   console.log(error);
    // }
  };
  const handleInputSelect = (e: any, formik: any) => {
    formik.setFieldValue('studentsVisibility', e.target.value);
  };
  const loadPageClasses = async (q: any, prevOptions: any, { page }: any) => {
    // const response = await dispatch(fetchClassList({ limit: 10, page: page, name: q })).then(
    //   (response: any) => response
    // );
    // return {
    //   options: response.payload?.payload?.map((item: any) => ({
    //     value: item._id,
    //     label: item.name,
    //   })),
    //   hasMore: response?.payload?.meta?.hasNextPage,
    //   additional: {
    //     page: response?.payload?.meta?.page + 1,
    //   },
    // };
  };
  useEffect(() => {
    const getSubjects = async () => {
      if (event?.classes?.length > 0) {
        // const response = await dispatch(
        //   fetchSubjectsByClasses({
        //     classesId: event?.classes?.map((el: { value: string; label: string }) => el?._id),
        //   })
        // ).then((response: any) => response);
        // setOptions(
        //   response.payload?.data?.subjects?.map((item: any) => ({
        //     value: item._id,
        //     label: item.name,
        //   }))
        // );
      }
    };
    getSubjects();
  }, [event]);
  const [options, setOptions] = useState([]);
  console.log(options);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={eventValidation}
      onSubmit={submitHandler}
    >
      {(formik) => {
        return (
          <Form className="calendar-form-container">
            <Input
              required={true}
              label="Nom de l’examen"
              name="title"
              placeholder="Entrer le nom de votre examen"
            />
            <AsyncSelect
              label="Classe(s)"
              height={'46px'}
              required={true}
              options={[{label: "classe", value: "classe"}]}
              className="exam-scheduler-classes"
              formik={formik}
              name="classes"
              defaultValue={
                event
                  ? formik.values.classes.map((el: any) => ({
                      label: el?.name || el?.label,
                      value: el?._id || el?.value,
                    }))
                  : []
              }
              placeholder="Sélectionner les classes"
              loadPageOptions={loadPageClasses}
              handleChange={async (value: any) => {
                if (value) {
                  // const response = await dispatch(
                  //   fetchSubjectsByClasses({
                  //     classesId: value?.map((el: { value: string; label: string }) => el?.value),
                  //   })
                  // ).then((response: any) => response);
                  formik.setFieldValue('subject', '');
                  // setOptions(
                  //   response.payload?.data?.subjects?.map((item: any) => ({
                  //     value: item._id,
                  //     label: item.name,
                  //   }))
                  // );
                } else {
                  formik.setFieldValue('subject', '');
                  setOptions([]);
                }
              }}
              onlyId={false}
              error={true}
              isMulti={true}
            />
            <div className="text_field_container">
              <label htmlFor={'subject'} className="label">
                Matière
                <p className="required">*</p>
              </label>
              <div className="select-async-container">
                <AsyncSelect
                  error={true}
                  className="subjects-select"
                  classNamePrefix="options"
                  height={'46px'}
                  isClearable={true}
                  isRtl={false}
                  onlyId={false}
                  formik={formik}
                  isSearchable={true}
                  placeholder="Sélectionner la matière"
                  name="subject"
                  value={
                    formik?.values?.subject !== ''
                      ? formik?.values?.subject
                      : options?.length === 0
                      ? options[0]
                      : ''
                  }
                  options={options}
                />
              </div>
            </div>
            <div>
              <div className="date-picker-container">
                <div className="text_field_container">
                  <label htmlFor={'date'} className="label">
                    Date et heure
                    <p className="required">*</p>
                  </label>
                  <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
                      <div className="date-time-picker">
                        <MobileDateTimePicker
                          ampm={false}
                          class="date-time-picker"
                          // localeText={"fr"}
                          className="date-timer-picker-calendar"
                          value={dayjs(formik.values.start)}
                          slots={{
                            toolbar: (value: any) => (
                              <div className="toolbar_time_picker">
                                <h4 className="toolbar_time_picker-date">
                                  {dayjs(value?.value).format('MMMM') +
                                    ' ' +
                                    dayjs(value?.value).format('YYYY')}
                                </h4>
                                <h4 className="toolbar_time_picker-time">
                                  à {dayjs(value?.value).format('HH:mm')}
                                </h4>
                              </div>
                            ),
                          }}
                          inputFormat="dd/MM/yyyy HH:mm a"
                          onChange={(value: any) => {
                            const end = formik.values.end;
                            const start = formik.values.start;
                            const diff = dayjs(end).diff(start, 'hour');
                            const newValue = dayjs(value);
                            formik.setFieldValue('end', newValue.add(diff, 'hour').toISOString());
                            formik.setFieldValue('start', newValue.toISOString());
                          }}
                        />
                      </div>
                    </LocalizationProvider>
                  </div>
                </div>
                <div className="text_field_container">
                  <label htmlFor={'color'} className="label">
                    Durée
                    <p className="required">*</p>
                  </label>
                  <div className="input_container">
                    <DurationPicker
                      fontSize="2rem"
                      formik={formik}
                      name="end"
                      start={formik.values.start}
                    />
                  </div>
                </div>
              </div>
            </div>
            <Input
              required={false}
              label="Description"
              name="description"
              placeholder="Ajouter une description"
            />
            <div className="text_field_container">
              <label htmlFor={'color'} className="label">
                Couleur
                <p className="required">*</p>
              </label>
              <ColorSinglePicker name="color" formik={formik} colors={colorOptions} />
            </div>
            <div className="text_field_container student-visibilty-container">
              <p className="student-visibilty">Rendre visible aux étudiants?</p>
              <div className="student-visibilty-radio">
                <label>
                  <input
                    onChange={(e) => handleInputSelect(e, formik)}
                    type="radio"
                    name="color"
                    value={true}
                    defaultChecked={formik.values.studentsVisibility}
                  />
                  <span></span>
                  Oui
                </label>
                <label>
                  <input
                    onChange={(e) => handleInputSelect(e, formik)}
                    type="radio"
                    name="color"
                    value={false}
                    defaultChecked={!formik.values.studentsVisibility}
                  />
                  <span></span>
                  Non
                </label>
              </div>
            </div>
            <div className={'confirm-vbtn'}>
              <div className="pop-up-delete-btns">
                <Button
                  type="button"
                  onClick={() => {
                    onCancel();
                  }}
                  // backgroundColor={0}
                  // color={25}
                  // borderColor={25}
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  // disabled={loading}
                  // label={loading ? t('loading') : t('btn')}
                  className="btn-primary category_form_button"
                >
                  {event ? 'Modifier' : 'Planifier'}
                </Button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default CalendarForm;
