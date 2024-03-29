'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
// import CreateExam from './_components/create-exam';
import { useQuery } from '@tanstack/react-query';
import { getExamContent, getOneExamById, getOneExamByIdForCorrection } from '@/actions/examens';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import Loading from '@/app/loading';
import { toast } from 'react-hot-toast';
import { cn } from '@/lib/utils';
import { getCorigeExameContent, getNameOfuserById, getUserById } from '@/actions/classe';
import { StudentFeadback } from '@/components/modals/studentFeadback';
import { useCreateExamCorrection } from '../../../../../hooks/useCreateExamCorrection';
import { Button } from '@/components/ui/button';
import { useConfettiStore } from '@/store/use-confetti-store';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { calcAllMark, statusOf, transferAllMarkToNull } from '@/app/_utils/calculateChildrenMarks';
import CreateExam from '@/components/shared-components/exam/create-exam';
export default function Page({
  params,
}: {
  params: { exam_id: string; classesId: string; student_id: string };
}) {
  const [sum, setSum] = useState<number>(-1);
  const [isFullMarks, setIsFullMarks] = useState(false);
  const confetti = useConfettiStore();
  const router = useRouter();
  const { exam_id } = params;
  const { student_id } = params;

  const { data, isPending } = useQuery<any>({
    queryKey: ['examenByIdd', exam_id],
    queryFn: async () => await getOneExamByIdForCorrection({ id: exam_id }),
  });

  const { data: examContent, isPending: isPendingExamContent } = useQuery<any>({
    queryKey: ['exameContent', exam_id],
    queryFn: async () => await getExamContent({ id: exam_id }),
  });

  const { data: userData, isPending: isPendingUser } = useQuery<any>({
    queryKey: ['userName', student_id],
    queryFn: async () => await getNameOfuserById(student_id),
  });

  const { data: getCorrigeExamOfUser, isPending: isPendingCorrige } = useQuery<any>({
    queryKey: ['CorigeExameContent', student_id],
    queryFn: async () => await getCorigeExameContent(+exam_id, student_id),
  });
  const MarkObtined = (getCorrigeExamOfUser && getCorrigeExamOfUser[0]?.mark_obtained) || null;
  // const { editExam, isPending: isPendingEdit } = useEditExamContent();
  const { createExamCorrectionn, isPending: isPendingCreate } = useCreateExamCorrection();
  const [fakeData, setFakeData] = useState<any>([]);
  //
  //
  //

  //
  // useEffect(() => {
  //   setSum(MarkObtined);
  // },[])
  useEffect(() => {
    if (isFullMarks) {
      const copiedData = JSON.parse(JSON.stringify(examContent?.content));
      setFakeData(copiedData);
    } else if (data?.content) {
      const copiedData = JSON.parse(JSON.stringify(data.content));

      transferAllMarkToNull(copiedData);
      setFakeData(copiedData);
      setSum(0);
    }
  }, [isFullMarks]);
  useEffect(() => {
    if (!isPending && data && data.content) {
      // const fakeData = data.content;
      if (
        getCorrigeExamOfUser?.length > 0 &&
        getCorrigeExamOfUser[0].correction_exam_content !== null
      ) {
        setFakeData(getCorrigeExamOfUser[0]?.correction_exam_content);
      } else {
        setFakeData(data?.content);
      }
    }
  }, [isPending, getCorrigeExamOfUser]);

  useEffect(() => {
    setSum(calcAllMark(fakeData));
  }, [fakeData]);

  if (isPending) return <Loading />;

  function handleCancel() {
    router.back();
  }

  const arabic = data?.language === 'ar' ? true : false;
  const sumToSave = sum > 0 ? sum : MarkObtined;

  const handleSaveData = async () => {
    try {
      if (sum > data?.total_mark) {
        toast.error(`La note doit être minimum a ${data?.total_mark}`);
        return;
      }
      const stataus = statusOf(fakeData);

      // Assuming you have the necessary data

      const dataToSave = {
        exam_id: parseInt(exam_id),
        mark_obtained: sumToSave,
        user_id: student_id,
        correction_exam_content: fakeData,
        status: stataus,
      };

      createExamCorrectionn(dataToSave);
      confetti.onOpen();

      // Additional logic after creating the exam correction, if needed
    } catch (error) {
      console.error('Error creating exam correction:', error);
    }
  };

  const examContentt = examContent?.content;

  if (!examContent) return <Loading />;

  return (
    <div className="flex flex-col gap-6">
      <nav className="flex justify-between w-full sticky top-0 left-1 p-4 z-[30] bg-white shadow-md">
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
                <span className="cursor-pointer" onClick={() => router.back()}>
                  {data?.exam_classess
                    .map((item: any) =>
                      item.name.length > 10 ? item.name.slice(0, 10) + '...' : item.name
                    )
                    .join(', ')}
                </span>

                <Image src="/arrowleft.svg" alt="icons" width={20} height={20} />

                <HoverCard>
                  <HoverCardTrigger asChild>
                    <span className="cursor-pointer">
                      {userData?.name.length > 10
                        ? userData?.name.slice(0, 10) + '...'
                        : userData?.name}
                    </span>
                    {/* <div className="text-[#1B8392] text-2xl font-semibold ">{classeName}</div> */}
                  </HoverCardTrigger>
                  <HoverCardContent className="text-[#727272]  break-words w-[200px] text-md">
                    <span className="">{userData?.name}</span>
                  </HoverCardContent>
                </HoverCard>
              </>
            )}
          </div>
        </div>

        <div className="flex gap-3 pt-4 h-14 cursor-pointe ">
          <Button
            onClick={() => setIsFullMarks((prev) => !prev)}
            className={` bg-transparent border text-white bg-2`}
            // className={` bg-transparent border text-1 ${isFullMarks && 'bg-[#000] text-16'}`}
          >
            Commencer au {isFullMarks ? 'min' : 'max'}
          </Button>
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
              {sum > -1 ? sum : MarkObtined} / {data?.total_mark}
            </button>
          </div>
          <div className="flex items-center gap-3 p-2 border rounded-lg cursor-pointer border-[#F04438] text-[#F04438] hover:opacity-80 ">
            <button
              onClick={() => handleCancel()}
              className="flex items-center gap-3 pl-2 pr-2 text-sm font-semibold leading-tight text-center"
            >
              <Image src="/redClose.svg" alt="icons" width={10} height={10} />
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

      <div className="fixed right-4 bottom-4 ">
        <StudentFeadback params={params}>
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
