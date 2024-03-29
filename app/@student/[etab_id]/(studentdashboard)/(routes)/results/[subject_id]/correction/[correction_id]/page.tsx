'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getExamContent, getOneExamByIdForCorrection } from '@/actions/examens';
import { Skeleton } from '@/components/ui/skeleton';
import Loading from '@/app/loading';
import { cn } from '@/lib/utils';
import { getCorigeExameContent } from '@/actions/classe';
import Exam from '../_components/Exam';
import { calcAllMark } from '@/app/_utils/calculateChildrenMarks';
import { StudentFeedback } from '../_components/StudentFeedback';
import { Button } from '@/components/ui/button';
import CreateExam from '@/components/shared-components/exam/create-exam';
import { useUpdateExamPresp } from './hooks/useUpdateStudProsp';
import { usePathname } from 'next/navigation';
import FilesUploader from '@/components/shared-components/FilesUploader';

export default function Page({ params }: { params: { correction_id: string; etab_id: string } }) {
  const [sum, setSum] = useState(0);
  const [sumPresp, setSumPresp] = useState(0);
  const [autoData, setAutoData] = useState<any>([]);
  const [isAutoCorrection, setIsAutoCorrection] = useState(false);
  const queryClient = useQueryClient();
  const { correction_id } = params;
  const user = queryClient.getQueryData(['user']) as any;
  const {updateStudentPrespectation, isPending: isSubmittingPres} = useUpdateExamPresp()
  const student_id = user?.id;

  const { data, isPending } = useQuery<any>({
    queryKey: ['user-exam', correction_id],
    queryFn: async () => await getOneExamByIdForCorrection({ id: correction_id }),
  });

  const { data: examContent } = useQuery<any>({
    queryKey: ['exameContent', correction_id],
    queryFn: async () => await getExamContent({ id: correction_id }),
  });

  const { data: getCorrigeExamOfUser } = useQuery<any>({
    queryKey: ['CorigeExameContent', student_id, correction_id],
    queryFn: async () => await getCorigeExameContent(+correction_id, student_id),
  });


  const [fakeData, setFakeData] = useState<any>([]);

  useEffect(() => {
    if (!isPending && data && data.content) {
      if (getCorrigeExamOfUser?.length > 0) {
        setFakeData(getCorrigeExamOfUser[0]?.correction_exam_content);
      } else {
        setFakeData(data?.content);
      }
      setSum(calcAllMark(fakeData));
    }
  }, [isPending, getCorrigeExamOfUser]);

  useEffect(() => {
    const mark =
      getCorrigeExamOfUser?.length && !isAutoCorrection && getCorrigeExamOfUser[0].mark_obtained;
    setSum(mark || calcAllMark(fakeData));
  }, [fakeData, getCorrigeExamOfUser, isAutoCorrection]);

  
  useEffect(() => {
    setSumPresp(calcAllMark(autoData));
  }, [autoData, isAutoCorrection]);


  useEffect(() => {
    if (isAutoCorrection) {
      const copiedData = JSON.parse(
        JSON.stringify(getCorrigeExamOfUser?.[0]?.student_prespectation || data?.content)
      );

      setAutoData(copiedData);
    } else if (data?.content) {
      const copiedData = JSON.parse(JSON.stringify(data.content));

      setAutoData(copiedData);
    }
  }, [isAutoCorrection]);

  if (isPending) return <Loading />;

  const hasNullMark = (content: any) => {
    for (const item of content) {
      if (item.mark === null) {
        return true;
      }
      if (item.children && hasNullMark(item.children)) {
        return true;
      }
    }
    return false;
  };
  const arabic = data?.language === 'ar' ? true : false;

  const examContentt = examContent?.content;
  if (!examContent) return <Loading />;

  function submitPrespectation() {
    const correction_id = getCorrigeExamOfUser?.[0]?.id;
    updateStudentPrespectation({correction_id, user_id: student_id, prespectation: autoData})
  }

  const isCorrected = getCorrigeExamOfUser?.[0]?.is_published

  return (
    <div className="flex flex-col gap-6">
      <nav className="flex justify-between w-full  sticky top-0 left-0 p-4 bg-white z-[50] shadow-md">
        <div className="flex flex-col gap-4">
          {isPending ? (
            <Skeleton className="w-[300px] h-[40px]" />
          ) : (
            <div className="text-[#1B8392] text-2xl font-semibold ">{data?.name} </div>
          )}
          <div className="flex items-center text-[#727272]">
            {isPending ? (
              <span className="flex items-center gap-3 cursor-pointer">
                <Skeleton className="w-[80px] h-[20px]" />
                <Skeleton className="w-[80px] h-[20px]" />
                <Skeleton className="w-[80px] h-[20px]" />
              </span>
            ) : (
              <>
                <span className="cursor-pointer">
                  {data?.exam_classess.map((item: any) => item.name).join(', ')}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="flex gap-3 pt-4 h-14 cursor-pointe ">
          <FilesUploader editable={false}/>
          {isAutoCorrection && (
            <Button className=" bg-2 text-white" onClick={submitPrespectation}>
              <span>Enregistrer</span>
            </Button>
          )}
          <Button
            className=" bg-2 text-white"
            onClick={() => setIsAutoCorrection(!isAutoCorrection)}
          >
            <Image src="/icons/switch.svg" width={20} height={20} alt="switch" />
            <span>{isAutoCorrection ? 'Prof-corrigé' : 'Auto-corregé'}</span>
          </Button>

          <div
            className={cn(
              'flex items-center w-[109px] pt-4  gap-3  border rounded-lg cursor-pointer border-[#F04438]  text-[rgb(240,68,56)] hover:opacity-80',
              +sum < +data?.total_mark && 'bg-[#dea53b1b] border-[#dea53b] text-[#dea53b] ',
              +sum === +data?.total_mark && 'bg-[#d1fadf] border-[#399739] text-[#399739] '
            )}
          >
            <div
              className={cn(
                'w-full flex items-center justify-center gap-3 pl-2 pr-2 text-sm font-semibold  leading-tight '
              )}
            >
              <span className=" text-2xl pb-4 -mr-3">
                {isAutoCorrection ? sumPresp : isCorrected ? sum : '--'}
              </span>{' '}
              / {data?.total_mark}
            </div>
          </div>
        </div>
      </nav>
      <CreateExam />
      {isAutoCorrection ? (
        <CreateExam
          isArabic={arabic}
          setFakeData={setAutoData}
          fakeData={autoData}
          realExamContetn={examContentt}
        />
      ) : isCorrected ? (
        <Exam isArabic={arabic} fakeData={fakeData} realExamContetn={examContentt} />
      ) : (
        <p>Examen non corrigé a ce moment là ...</p>
      )}

      {!isAutoCorrection && (
        <div className="fixed right-4 bottom-4">
          <StudentFeedback
            content={getCorrigeExamOfUser?.length && getCorrigeExamOfUser[0].feedback}
          >
            <Image
              src="/bigEditNote.svg"
              width={100}
              height={100}
              alt="editicon"
              className="cursor-pointer"
            />
          </StudentFeedback>
        </div>
      )}
    </div>
  );
}
