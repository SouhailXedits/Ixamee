'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';
import MarkSheetStudentList from './components/StudentsList';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllClasse, getMarkSheets } from '@/actions/classe';
import { useParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';
import PDFExport from '@/app/_utils/ExportAsPdf';
import { MarkSheetPdfClass } from './components/MarkSheetTeacher';

const Student = () => {
  const params = useParams();
  const queryClient = useQueryClient();

  const user = queryClient.getQueryData(['user']) as any;

  const etab_id = Number(params.etab_id);

  const { data: classes } = useQuery({
    queryKey: ['classe', etab_id],
    queryFn: async () => await getAllClasse({ user_id: user?.id, etab_id }),
  });

  const defaultTerm = user?.term === 'TRIMESTRE' ? 'trimestre_1' : 'semestre_1';
  const subjectsQuery = queryClient.getQueryData(['teacherSubject']) as any;
  const userEstabQuery = queryClient.getQueryData(['teacherEstab']) as any;

  const [filters, setFilters] = useState({
    term: defaultTerm,
    classe_id: classes?.data?.length ? classes?.data[0]?.id : '',
    subject_id: subjectsQuery?.length ? subjectsQuery[0]?.id : '',
  });

  useEffect(() => {
    if (classes?.data?.length) {
      setFilters({ ...filters, classe_id: classes?.data[0]?.id });
      queryClient.setQueryData(['classe-filters'], filters.classe_id);
    }
  }, [classes?.data]);

  const { data: markSheets, isLoading: isMarkSheetsLoading } = useQuery({
    queryKey: ['mark-sheets', filters.classe_id, filters.term, filters.subject_id],
    queryFn: async () => await getMarkSheets(filters),
    enabled: Boolean(classes?.data?.length),
  });

  const groupedData = markSheets?.data?.reduce((acc: any, item: any) => {
    const userId = item.user.id;
    if (!acc[userId]) {
      acc[userId] = [];
    }
    acc[userId].push(item);

    return acc;
  }, {});

  const [resultArray, setResultArray] = useState<any[]>([]);

  useEffect(() => {
    if (groupedData) {
      const result = Object?.keys(groupedData).map((userId) => {
        const userData = groupedData[userId];

        const examsInfo = userData.map((examData: any) => {
          const { id, exam } = examData;

          const average = (examData.mark_obtained * exam.coefficient) / exam.coefficient;
          const overTwentyAvg = (20 / exam.total_mark) * average;

          return {
            id: exam.id,
            name: exam.name,
            marksObtained: examData.mark_obtained,
            totalMarks: exam.total_mark,
            coefficient: exam.coefficient,
            average: average,
            overTwentyAvg: overTwentyAvg,
          };
        });

        let overallAverage =
          examsInfo.reduce(
            (acc: any, exam: any): any => acc + exam.overTwentyAvg * exam.coefficient,
            0
          ) / Object.values(groupedData).reduce((acc: any, userData: any) => acc + userData.length, 0) * maxCoefficient;

        return {
          id: userId,
          name: userData[0].user.name,
          image: userData[0].user.image,
          exams: examsInfo,
          average: overallAverage,
        };
      });

      setResultArray(result);
    }
  }, [groupedData]);

  const [sortedData, setSortedData] = useState<any[]>([]);
  const [rankedData, setRankedData] = useState<any[]>([]);

  useEffect(() => {
    if (resultArray.length) {
      const sorted = [...resultArray].sort((a, b) => b.average - a.average);
      setSortedData(sorted);
      setRankedData(sorted.map((student, index) => ({ ...student, rank: index + 1 })));
    }
  }, [resultArray]);

  const maxCoefficient = resultArray.reduce((acc: any, student: any) => {
    const weightedCoef = student.exams.reduce((sum: any, exam: any) => sum + exam.coefficient, 0);
    return Math.max(acc, weightedCoef);
  }, 0);

  return (
    <main className="flex flex-col gap-6 p-10">
      <nav className="flex justify-between w-full ">
        <div className="flex flex-col gap-4">
          <div className="text-[#1B8392] text-2xl font-semibold ">Bulletins</div>
          <div className="flex items-center text-[#727272]">
            <Image src="/arrowleft.svg" alt="icons" width={20} height={20} />
            <span className="cursor-pointer">Bulletins</span>
          </div>
        </div>

        <div className="flex gap-3 pt-4 h-14 cursor-pointe ">
          <PDFExport pdfName
