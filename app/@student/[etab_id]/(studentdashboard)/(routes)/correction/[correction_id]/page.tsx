"use client"

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getExamContent, getOneExamById, getOneExamByIdForCorrection } from '@/actions/examens';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import Loading from '@/app/loading';

import { cn } from '@/lib/utils';
import { getCorigeExameContent, getNameOfuserById, getUserById } from '@/actions/classe';
import { StudentFeadback } from '@/components/modals/studentFeadback';
import { useCreateExamCorrection } from "@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/classes/hooks/useEditeExamCorrection";
import Exam from "../_components/Exam";
import { calcAllMark } from '@/app/_utils/calculateChildrenMarks';
export default function Page({ params }: { params: { correction_id: string; etab_id: string } }) {
  const [sum, setSum] = useState(0);
  const queryClient = useQueryClient()
  console.log(params);
  const router = useRouter();
  const { correction_id } = params;   
  const { etab_id } = params;   
  const user = queryClient.getQueryData(['user']) as any;
  const student_id = user?.id;
  const { data, isPending } = useQuery<any>({
    queryKey: ['user-exam', correction_id],
    queryFn: async () => await getOneExamByIdForCorrection({ id: correction_id }),
  });

  const { data: examContent, isPending: isPendingExamContent } = useQuery<any>({
    queryKey: ['exameContent', correction_id],
    queryFn: async () => await getExamContent({ id: correction_id }),
  });
  console.log(examContent);

  const { data: userData, isPending: isPendingUser } = useQuery<any>({
    queryKey: ['userName', student_id],
    queryFn: async () => await getNameOfuserById(student_id),
  });

  const { data: getCorrigeExamOfUser, isPending: isPendingCorrige } = useQuery<any>({
    queryKey: ['CorigeExameContent'],
    queryFn: async () => await getCorigeExameContent(+correction_id, student_id),
  });
  console.log(getCorrigeExamOfUser);

  // const { editExam, isPending: isPendingEdit } = useEditExamContent();
  const { createExamCorrectionn, isPending: isPendingCreate } = useCreateExamCorrection();
  const [fakeData, setFakeData] = useState<any>([]);

  console.log(fakeData);

  useEffect(() => {
    if (!isPending && data && data.content) {
      // const fakeData = data.content;
      if (getCorrigeExamOfUser?.length > 0) {
        setFakeData(getCorrigeExamOfUser[0]?.correction_exam_content);
      } else {
        setFakeData(data?.content);
      }
      setSum(calcAllMark(fakeData));
    }
  }, [isPending, getCorrigeExamOfUser]);

  useEffect(() => {
    setSum(calcAllMark(fakeData));
  }, [fakeData]);

  if (isPending) return <Loading />;

//   function handleCancel() {
//     router.back();
//   }
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
  // const { createExamCorrectionn, isPending: isPendingCreate } = useCreateExamCorrection();
  const statusOf = (data: any) => {
    const hasPending = hasNullMark(data);
    const status = hasPending ? 'pending' : 'done';
    return status;
  };
  const handleSaveData = async () => {
    try {
      const stataus = statusOf(fakeData);

      console.log(stataus);

      // Assuming you have the necessary data
      

      // Additional logic after creating the exam correction, if needed

      console.log('Exam correction created successfully');
    } catch (error) {
      console.error('Error creating exam correction:', error);
    }
  };

  const examContentt = examContent?.content;
  console.log(examContentt);
  if (!examContent) return <Loading />;

  return (
    <div className="flex flex-col gap-6 p-10">
      <nav className="flex justify-between w-full ">
        <div className="flex flex-col gap-4">
          {isPending ? (
            <Skeleton className="w-[300px] h-[40px]" />
          ) : (
            <div className="text-[#1B8392] text-2xl font-semibold ">{data?.name} </div>
          )}
          <div className="flex items-center text-[#727272]">
            <Image src="/arrowleft.svg" alt="icons" width={20} height={20} />
            <span className="cursor-pointer">Examens</span>
            <Image src="/arrowleft.svg" alt="icons" width={20} height={20} />
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
                <Image src="/arrowleft.svg" alt="icons" width={20} height={20} />

                <span className="cursor-pointer"> {userData?.name}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex gap-3 pt-4 h-14 cursor-pointe ">
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
              <span className=" text-3xl pb-4 -&mr-3">{sum}</span> / {data?.total_mark}
            </div>
          </div>
          {/* <div className="flex items-center gap-3 p-2 border rounded-lg cursor-pointer border-[#F04438] text-[#F04438] hover:opacity-80 ">
            <button
              onClick={() => handleCancel()}
              className="flex items-center gap-3 pl-2 pr-2 text-sm font-semibold leading-tight text-center"
            >
              <Image src="/redcloseicon2.svg" alt="icons" width={10} height={10} />
              Annuler
            </button>
          </div> */}

          {/* <div className="flex items-center p-2 border rounded-lg cursor-pointer bg-[#1B8392] text-white gap-3 hover:opacity-80 ">
            <div
              className="flex items-center gap-3 pl-2 pr-2 text-sm font-semibold leading-tight text-center"
              onClick={handleSaveData}
            >
              <Image src={'/enregistreIcon.svg'} alt="icons" width={20} height={20} className="" />
              Enregister
            </div>
          </div> */}
        </div>
      </nav>
      {/* <CreateExam examId={examenId} /> */}
      {/* <EmailSend /> */}

      <Exam
        // data={data}
        isArabic={arabic}
        setFakeData={setFakeData}
        fakeData={fakeData}
        realExamContetn={examContentt}
      />

      <div className="fixed right-4 bottom-4">
        <StudentFeadback>
          <Image
            src="/bigEditNote.svg"
            width={100}
            height={100}
            alt="editicon"
            className="cursor-pointer"
          />
        </StudentFeadback>
      </div>
    </div>
  );
}
