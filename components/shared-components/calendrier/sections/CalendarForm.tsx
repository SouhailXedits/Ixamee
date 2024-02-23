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
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getSubjectOfUser } from '@/actions/examens';
import { useCreateExamPlan } from '../hooks/useCreateExamPlan';
import { useUpdateExamPlan } from '../hooks/useUpdateExamPlan';

// function useSubjectOptions(classes, user_id) {
//   const queryClient = useQueryClient();
//   const [options, setOptions] = useState([]);

//   useEffect(() => {
//     const fetchSubjects = async () => {
//       const { data: subjects } = await queryClient.fetchQuery({queryKey : ['selectSubjects', classes], queryFn: () =>
//        getSubjectOfUser(user_id, classes)}
//       );
//       if (subjects) {
//         setOptions(
//           subjects?.data?.subjects?.map((item) => ({
//             value: item.id,
//             label: item.name,
//           })) || []
//         );
//       }
//     };

//     fetchSubjects();
//   }, [queryClient, classes, user_id]);
//   console.log(options)

//   return options;
// }

function CalendarForm({
  eventId,
  range,
  onCancel,
  Prefix,
  height = '46px',
  colorOptions,
  topMenu = false,
}: any) {
  const queryClient = useQueryClient();
  const params = useParams();
  const { etab_id } = params;
  const [classes, setClasses] = useState([]);
  // const e = null;
  const user = queryClient.getQueryData(['user']);
  const user_id = user.id;
  // const options = useSubjectOptions(classes, user_id);
  const { data: Teachersubject, isPending: isPendingSubject } = useQuery({
    queryKey: ['teachersubject', classes],
    queryFn: async () => await getSubjectOfUser(user_id, classes),
  });

  const options = Teachersubject?.map((item: SubjectOutputProps) => {
    return {
      value: item.id,
      label: item.name,
    };
  });
  const { creatExamPlan, isPending } = useCreateExamPlan();
  const allEvents = queryClient.getQueryData(['events']);
  console.log(eventId);
  const e = allEvents.find((event) => event.id === +eventId);
  console.log(e);
  const {updateExamPlan} = useUpdateExamPlan()

  // const e = {
  //   id: 1,
  //   title: 'event 1',
  //   start: '2024-02-05',
  //   end: '2024-02-05',
  //   color: 'purple',
  //   textColor: 'white',
  //   classes: [{ name: 'class 1', _id: '1' }],
  //   subject: { name: 'subject 1', _id: '1' },
  //   studentsVisibility: true,
  //   establishment: '1',
  // };

  // const dispatch = useAppDispatch();
  const eventValidation = useValidationscategorySchema();

  const initialValues = {
    title: e ? e?.title : '',
    start: e ? e?.start : range?.start.toISOString(),
    end: e ? e?.end : dayjs(range?.start).add(2, 'hour').toISOString(),
    color: e ? e?.color : '',
    classes: e ? e?.classes?.map((el: any) => ({ label: el?.name, value: el?.id })) : [],
    subject: e ? { label: e?.subject?.name, value: e?.subject?.id } : '',
    description: e ? e?.description : '',
    studentsVisibility: e ? e?.studentsVisibility : false,
    establishment: e ? e?.establishment : '',
  };
  const submitHandler = async (values: any) => {
    console.log(values);
    const classesIds = values.classes.map((el: any) => el.value);
    console.log(classesIds);
    const subjectId = values.subject.value;
    console.log(subjectId);
    const values2 = {
      ...values,
      classes: classesIds,
      subject: subjectId,
      estab: etab_id,
      user_id,
      id: eventId ? +eventId : null,
    };

    console.log(values2);
    if (!eventId) {creatExamPlan(values2) 
      onCancel()
    }
    else {
      updateExamPlan(values2);
      onCancel()
    }

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
    const classes = queryClient.getQueryData(['classe', etab_id]);
    console.log(classes);
    return {
      options: classes?.data?.map((item: any) => ({
        value: item.id,
        label: item.name,
      })),
    };
  };

  // console.log(Formik.values);

  // useEffect(() => {
  //   // This function will run whenever Formik values change
  //   console.log(formik.values);
  // }, [formik.values]);

  useEffect(() => {
    const getSubjects = async () => {
      if (e?.classes?.length > 0) {
        // const response = await dispatch(
        //   fetchSubjectsByClasses({
        //     classesId: e?.classes?.map((el: { value: string; label: string }) => el?._id),
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
  }, [e]);
  // const [options, setOptions] = useState([{ label: 'subject 1', value: '1' }]);
  console.log('subjects 🇹🇳', options);

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
              options={[{ label: 'classe', value: 'classe' }]}
              className="exam-scheduler-classes"
              formik={formik}
              name="classes"
              defaultValue={
                e
                  ? formik.values.classes?.map((el: any) => ({
                      label: el?.name || el?.label,
                      value: el?._id || el?.value,
                    }))
                  : []
              }
              placeholder="Sélectionner les classes"
              loadPageOptions={loadPageClasses}
              handleChange={(value: any) => {
                formik.setFieldValue('subject', '');
                setClasses(value || []);
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
                          className="date-timer-picker-calendar !text-8"
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
            <div className={'confirm-vbtn mt-5'}>
              <div className="pop-up-delete-btns justify-between flex gap-2">
                <Button
                  type="button"
                  onClick={() => {
                    onCancel();
                  }}
                  className=" bg-transparent border border-2 text-2 w-full"
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
                  className="btn-primary category_form_button bg-2 w-full"
                >
                  {e ? 'Modifier' : 'Planifier'}
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
