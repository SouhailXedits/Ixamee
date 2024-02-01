'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import CreateExam from './_components/create-exam';
import { useQuery } from '@tanstack/react-query';
import { getExamContent, getOneExamById } from '@/actions/examens';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
// import { useEditExamContent } from '../hooks/useEditExamContent';
import Loading from '@/app/loading';
import { toast } from 'react-hot-toast';
import { calcAllMark } from './_components/calculateChildrenMarks';
import { cn } from '@/lib/utils';
import { getNameOfuserById, getUserById } from '@/actions/classe';
import { StudentFeadback } from '@/components/modals/studentFeadback';
import { useCreateExamCorrection } from '../../../../../hooks/useCreateExamCorrection';
export default function Page({
  params,
}: {
  params: { exam_id: string; classesId: string; student_id: string };
}) {
  const [sum, setSum] = useState(0);
  console.log(params);
  const router = useRouter();
  const { exam_id } = params;
  const { student_id } = params;
  const { data, isPending } = useQuery<any>({
    queryKey: ['examenByIdd'],
    queryFn: async () => await getOneExamById({ id: exam_id }),
  });
  const { data: examContent, isPending: isPendingExamContent } = useQuery<any>({
    queryKey: ['exameContent'],
    queryFn: async () => await getExamContent({ id: exam_id }),
  });

  const { data: userData, isPending: isPendingUser } = useQuery<any>({
    queryKey: ['userName'],
    queryFn: async () => await getNameOfuserById(student_id),
  });

  // const { editExam, isPending: isPendingEdit } = useEditExamContent();
  const { createExamCorrectionn, isPending: isPendingCreate } = useCreateExamCorrection();
  const [fakeData, setFakeData] = useState<any>([]);
  useEffect(() => {
    if (!isPending && data && data.content) {
      // const fakeData = data.content;
      setFakeData(data?.content);
      setSum(calcAllMark(fakeData));
    }
  }, [isPending]);

  useEffect(() => {
    setSum(calcAllMark(fakeData));
  }, [fakeData]);

  if (isPending) return <Loading />;

  function handleCancel() {
    router.back();
  }
  const arabic = data?.language === 'ar' ? true : false;
  // const { createExamCorrectionn, isPending: isPendingCreate } = useCreateExamCorrection();

  const handleSaveData = async () => {
    try {
      // Assuming you have the necessary data
      const dataToSave = {
        exam_id: parseInt(exam_id),
        mark_obtained: sum, // or any other value you want to use
        user_id: student_id,
        correction_exam_content: fakeData,
      };
      console.log(dataToSave);

      createExamCorrectionn(dataToSave);

      // Additional logic after creating the exam correction, if needed

      console.log('Exam correction created successfully');
    } catch (error) {
      console.error('Error creating exam correction:', error);
    }
  };

  const examContentt = examContent?.content;

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
              <span className="cursor-pointer">
                {data?.exam_classess.map((item: any) => item.name).join(', ')}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-3 pt-4 h-14 cursor-pointe ">
          <div
            className={cn(
              'flex items-center w-[109px]  gap-3  border rounded-lg cursor-pointer border-[#F04438]  text-[rgb(240,68,56)] hover:opacity-80',
              +sum < +data?.total_mark && 'bg-[#dea53b1b] border-[#dea53b] text-[#dea53b] ',
              +sum === +data?.total_mark && 'bg-[#d1fadf] border-[#399739] text-[#399739] '
            )}
          >
            <button
              className={cn(
                'w-full flex items-center justify-center gap-3 pl-2 pr-2 text-sm font-semibold  leading-tight '
              )}
            >
              {sum} / {data?.total_mark}
            </button>
          </div>
          <div className="flex items-center gap-3 p-2 border rounded-lg cursor-pointer border-[#F04438] text-[#F04438] hover:opacity-80 ">
            <button
              onClick={() => handleCancel()}
              className="flex items-center gap-3 pl-2 pr-2 text-sm font-semibold leading-tight text-center"
            >
              <Image src="/redcloseicon2.svg" alt="icons" width={10} height={10} />
              Annuler
            </button>
          </div>

          <div className="flex items-center p-2 border rounded-lg cursor-pointer bg-[#1B8392] text-white gap-3 hover:opacity-80 ">
            <div
              className="flex items-center gap-3 pl-2 pr-2 text-sm font-semibold leading-tight text-center"
              onClick={handleSaveData}
            >
              <Image src={'/enregistreIcon.svg'} alt="icons" width={20} height={20} className="" />
              Enregister
            </div>
          </div>
        </div>
      </nav>
      {/* <CreateExam examId={examenId} /> */}
      {/* <EmailSend /> */}

      <CreateExam
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
