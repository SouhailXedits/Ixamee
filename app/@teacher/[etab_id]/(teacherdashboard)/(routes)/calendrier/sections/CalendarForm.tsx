import { Formik, Form } from 'formik';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import DurationPicker from '../components/duationPicker/DurationPicker';
import AsyncSelect from '../components/asyncSelect/AsyncSelect';
import Button from '@/components/ui/button';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getSubjectOfUser } from '@/actions/examens';
import { useCreateExamPlan } from '../hooks/useCreateExamPlan';

interface SubjectOutputProps {
  id: string;
  name: string;
}

interface Props {
  eventId?: string;
  range?: any;
  onCancel: () => void;
  onCreateUpdateEvent: (values: any) => void;
  Prefix?: string;
  height?: string;
  colorOptions?: any;
  topMenu?: boolean;
}

export default function CalendarForm({
  eventId,
  range,
  onCancel,
  onCreateUpdateEvent,
  Prefix,
  height = '46px',
  colorOptions,
  topMenu = false,
}: Props) {
  const queryClient = useQueryClient();
  const params = useParams();
  const { etab_id } = params;
  const user = queryClient.getQueryData(['user']);
  const user_id = user.id;
  const [classes, setClasses] = useState<any[]>([]);
  const [subjectOptions, setSubjectOptions] = useState<any[]>([]);

  const { data: Teachersubject, isPending: isPendingSubject } = useQuery({
    queryKey: ['teachersubject', classes],
    queryFn: async () => await getSubjectOfUser(user_id, classes),
  });

  const creatExamPlan = useCreateExamPlan();

  const handleInputSelect = (e: any, formik: any) => {
    formik.setFieldValue('studentsVisibility', e.target.value);
  };

  const loadPageClasses = async (q: any, prevOptions: any, { page }: any) => {
    const classes = queryClient.getQueryData(['classe', etab_id]);
    return {
      options: classes?.data?.map((item: any) => ({
        value: item.id,
        label: item.name,
      })),
    };
  };

  const handleClassesChange = (value: any) => {
    setClasses(value || []);
    setSubjectOptions([]);
  };

  useEffect(() => {
    if (classes.length > 0) {
      const fetchSubjects = async () => {
        const subjects = await getSubjectOfUser(user_id, classes);
        setSubjectOptions(
          subjects?.data?.subjects?.map((item: SubjectOutputProps) => ({
            value: item.id,
            label: item.name,
          })) || []
        );
      };
      fetchSubjects();
    }
  }, [classes, user_id]);

  const initialValues = {
    title: eventId ? eventId : '',
    start: eventId ? eventId?.start : dayjs(range?.start).toISOString(),
    end: eventId ? eventId?.end : dayjs(range?.start).add(2, 'hour').toISOString(),
    color: eventId ? eventId?.color : '',
    classes: eventId ? eventId?.classes?.map((el: any) => ({ label: el?.name, value: el?._id })) : [],
    subject: eventId ? { label: eventId?.subject?.name, value: eventId?.subject?._id } : '',
    description: eventId ? eventId?.description : '',
    studentsVisibility: eventId ? eventId?.studentsVisibility : false,
    establishment: eventId ? eventId?.establishment : '',
  };

  const submitHandler = async (values: any) => {
    const classesIds = values.classes.map((el: any) => el.value);
    const subjectId = values.subject.value;
    const values2 = { ...values, classes: classesIds, subject: subjectId, estab: etab_id, user_id };
    creatExamPlan(values2);
  };

  return (
    <Formik initialValues={initialValues} validationSchema={eventValidation} onSubmit={submitHandler}>
      {(formik) => {
        return (
          <Form className="calendar-form-container">
            {/* Render your form fields here */}
          </Form>
        );
      }}
    </Formik>
  );
}
