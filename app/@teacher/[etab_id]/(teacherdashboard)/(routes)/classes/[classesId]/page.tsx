'use client';
import Image from 'next/image';
import Link from 'next/link';
import { StudentList } from './_components/student-list';
import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import {
  getClasseById,
  getCorigeExameContentOfAllUser,
  getStudentOfClasse,
} from '@/actions/classe';
import { Button } from '@/components/ui/button';
import { useEffect, useMemo, useState } from 'react';
import Loading from '@/app/loading';
import { useSendExamMark } from '../hooks/useSendResult';
import { Skeleton } from '@/components/ui/skeleton';
import AddStudent from './_components/AddStudent';
import ImportClasse from './_components/ImportClasse';
import ExportClassePdf from './_components/ExportClassePdf';
import Selects from './_components/Selects';
import { getCorrectionOfUser } from '@/actions/mark-sheets/actions';
import { classe, userCorrection } from './types';

const Student = ({ params }: { params: { classesId: string } }) => {
  const queryClient = useQueryClient();

  const { classesId } = params;
  const etab_id = queryClient.getQueryData(['etab_id']) as number;

  const teacherEstab = queryClient.getQueryData(['teacherEstab']) as any;
  const teacherEstabName = teacherEstab?.filter((item: any) => item.id === +etab_id)[0]?.name;

  const { sendExamMark, isPending: isPendingSend } = useSendExamMark();

  const [filter, setFilter] = useState<string>('');
  const [exam, setExam] = useState<string>('');

  const classeQuery = useQuery<classe>(
    ['classe', classesId],
    async () => await getClasseById(+classesId),
    {
      onSuccess: (data) => {
        const note = data?.exam_classe[0]?.id;
        setExam(note + '');
      },
    }
  );

  const userCorrectionQuery = useQuery<userCorrection[]>(
    ['userCorrection', exam, classesId],
    async () => await getCorrectionOfUser(classesId, data, exam),
    {
      retry: 0,
      enabled: Boolean(exam),
    }
  );

  const studentQuery = useQuery<any>(['userOfClasses', classesId], async () =>
    await getStudentOfClasse(+classesId)
  );

  const corrigeExamQuery = useQuery<any>(
    ['CorigeExameContent', exam],
    async () => await getCorigeExameContentOfAllUser(exam, data),
    {
      enabled: Boolean(exam),
    }
  );

  const newData = useMemo(() => {
    if (!data || !userCorrection || !getCorrigeExamOfUser) {
      return [];
    }

    return data
      .map((item: any) => ({
        ...item,
        correctionExamOfUser: getCorrigeExamOfUser,
        exam,
        classe,
        status:
          userCorrection.find((user: any) => user?.user_id === item?.id)?.status || 'notCorrected',
      }))
      .filter((item: any) => {
        if (
          filter === 'corrige' &&
          item.status === 'done' &&
          item.correctionExamOfUser &&
          item.correctionExamOfUser[0]?.mark_obtained
        ) {
          return true;
        } else if (
          filter === 'en-cours' &&
          item.status === 'pending' &&
          item.correctionExamOfUser &&
          item.correctionExamOfUser[0]?.mark_obtained
        ) {
          return true;
        } else if (
          filter === 'non-corrigé' &&
          item.status === 'notCorrected' &&
          item.correctionExamOfUser &&
          !item.correctionExamOfUser[0]?.mark_obtained
        ) {
          return true;
        } else if (
          filter === 'non-classé' &&
          item.status === 'notClassified' &&
          item.correctionExamOfUser &&
          !item.correctionExamOfUser[0]?.mark_obtained
        ) {
          return true;
        } else if (filter === 'absent' && item.status === 'absent') {
          return true;
        } else if (filter === 'allExam' || filter === '') {
          return true;
        }
        return false;
      });
  }, [data, exam, getCorrigeExamOfUser, userCorrection, filter]);

  useEffect(() => {
    if (classeQuery.isSuccess && classeQuery.data) {
      const note = classeQuery.data?.exam_classe[0]?.id;
      setExam(note + '');
    }
  }, [classeQuery.isSuccess, classeQuery.data]);

  const handleSendResults = () => {
    if (
      data?.length === userCorrectionQuery.data?.length &&
      userCorrectionQuery.data?.every((user: any) => user?.
