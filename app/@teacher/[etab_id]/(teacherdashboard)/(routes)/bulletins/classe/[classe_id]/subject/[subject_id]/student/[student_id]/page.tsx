'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import TermCard from '@/components/shared-components/TermCard';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/app/loading';
import { calculateAverageMark } from '../../../../../../../../../../../_utils/calculateAverage';
import { getUserClasseInfos } from '@/actions/examens';
import { getNameEstabByClasseId } from '@/actions/establishements';
import { getAllSubjectNameById } from '@/actions/subjects';
import { getTeacherName } from '@/actions/teachers';
import PDFExport from '@/app/_utils/ExportAsPdf';
import MarkSheetStudent from '@/components/shared-components/MarkSheetStudent';
import { useMemo } from 'react';

const Student = () => {
  const params = useParams();
  const router = useRouter();
  const classeId = Number(params.classe_id);
  const subjectId = Number(params.subject_id);
  const currentId = params.student_id;

  const handleGoBack = () => {
    router.back();
  };

  const { data: user, isLoading: isUserLoading } = useQuery(['user', currentId], () => getUserById(currentId));
  const { data: marksheet, isLoading: isMarksheetLoading } = useQuery(['marksheet', currentId], () => getMarksheetByUserId(classeId, currentId, subjectId));
  const { data: classeName, isLoading: isClasseNameLoading } = useQuery(['classeName', classeId], () => getNameClasseByClasseId(classeId));
  const { data: estabName, isLoading: isEstabNameLoading } = useQuery(['estabName', classeId], () => getNameEstabByClasseId(classeId));
  const { data: subjectName, isLoading: isSubjectNameLoading } = useQuery(['subjectName', subjectId], () => getAllSubjectNameById(subjectId));
  const { data: TeacherName, isLoading: isTeacherNameLoading } = useQuery(['TeacherName', subjectId], () => getTeacherName(subjectId, classeId));
  const { data: userClasseInfos, isLoading: isUserClasseInfosLoading } = useQuery(['userClasseInfos', currentId], () => getUserClasseInfos({ userId: currentId, classeId, subjectId }));

  const isLoading = isUserLoading || isMarksheetLoading || isClasseNameLoading || isEstabNameLoading || isSubjectNameLoading || isTeacherNameLoading || isUserClasseInfosLoading;

  const examsData = marksheet?.data || [];

  const groupedExams = useMemo(() => {
    return examsData.reduce((result: any, exam: any) => {
      const term = exam.exam.term;
      if (!result[term]) {
        result[term] = [];
      }
      result[term].push({
        id: exam.id,
        exam_id: exam.exam.id,
        name: exam.exam.name,
        date: exam.exam.create_at.toISOString().split('T')[0],
        marksObtained: exam.mark_obtained,
        coefficient: exam.exam.coefficient,
        totalScore: exam.exam.total_mark,
        overTwnetyMark: exam.mark_obtained * (20 / exam.exam.total_mark),
        range: exam.rank,
      });
      return result;
    }, {});
  }, [examsData]);

  const isTrimester = Object.keys(groupedExams).some((key) =>
    key.toLowerCase().includes('trimestre')
  );

  const terms = isTrimester ? ['trimestre_1', 'trimestre_2', 'trimestre_3'] : ['semestre_1', 'semestre_2'];

  const trimesters = useMemo(() => {
    return terms.map((term) => ({
      name: term.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
      exams: groupedExams[term] || [],
    }));
  }, [groupedExams, terms]);

  const averageMark = calculateAverageMark(trimesters);

  if (isLoading) return <Loading />;

  return (
    <main className="flex flex-col gap-12 p-10">
      <nav className="flex justify-between w-full ">
        <div className="flex flex-col gap-4">
          <div className="text-[#1B8392] text-2xl font-semibold ">Bulletins</div>
          <div className="flex items-center text-[#727272]">
            <button name="btn" className="cursor-pointer" onClick={handleGoBack}>
              Bulletins
            </button>
            <Image src="/arrowleft.svg" alt="icons" width={20} height={20} />

            <span className="cursor-pointer">{user?.name}</span>
          </div>
        </div>

        <div className="flex gap-3 pt-4 h-14 cursor-pointe ">
          {/* importer */}
          <PDFExport pdfName="bulletin">
            <MarkSheetStudent
              data={trimesters}
              meta={{
                estab: estabName?.name,
                subject: subjectName?.name,
                classe: classeName?.name,
                fullName: user?.name,
                average: userClasseInfos?.length && userClasseInfos[0].average,
                range: userClasseInfos?.length && userClasseInfos[0].rankInClasse,
                teacherName: TeacherName?.name,
                userClasseInfos,
              }}
            />
          </PDFExport>
          {/* <div className="flex
