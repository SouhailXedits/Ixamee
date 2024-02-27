'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import CreateExam from './_components/create-exam';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getOneExamById } from '@/actions/examens';
import { Skeleton } from '@/components/ui/skeleton';
import { usePathname, useRouter } from 'next/navigation';
import { useEditExamContent } from '../hooks/useEditExamContent';
import Loading from '@/app/loading';
import { toast } from 'react-hot-toast';
import { cn } from '@/lib/utils';
import { calcAllMark } from '@/app/_utils/calculateChildrenMarks';
import { useConfettiStore } from '@/store/use-confetti-store';
import { haveZeroInfakeData } from './_components/sharedFunction';

export default function Page({ params }: { params: { examenId: string; etab_id: string } }) {
  const [sum, setSum] = useState(0);
  const pathname = usePathname();
  const confetti = useConfettiStore();

  const router = useRouter();
  const { examenId } = params;

  const { data, isPending } = useQuery<any>({
    queryKey: ['examenById', examenId],
    queryFn: async () => await getOneExamById({ id: examenId }),
  });
  const queryClient = useQueryClient();
  // const data = queryClient.getQueryData(['examenById', examenId]) as any;
  const { editExam, isPending: isPendingEdit } = useEditExamContent();

  const [fakeData, setFakeData] = useState<any>([]);

  useEffect(() => {
    if (data && data.content) {
      setFakeData(data.content);
      setSum(calcAllMark(fakeData));
    }
  }, [data]);

  useEffect(() => {
    setSum(calcAllMark(fakeData));
  }, [fakeData]);

  // if (isPending) return <Loading />;

  function handleCancel() {
    router.back();
  }
  const arabic = data?.language === 'ar' ? true : false;
  // const haveZeroInfakeData = (data: any) => {
  //   for (const item of data) {
  //
  //     if (item.mark === 0) {
  //       return true;
  //     }
  //     if (item.children && haveZeroInfakeData(item.children)) {
  //       return true;
  //     }
  //   }
  //   return false;
  // };
  const handleSaveData = () => {
    if (fakeData === data?.content) {
      toast.error("Aucune modification n'a été effectuee.");
      return;
    }
    if (sum > data?.total_mark) {
      toast.error(`La note doit être minimum a ${data?.total_mark}`);
      return;
    }
    if (haveZeroInfakeData(fakeData)) {
      toast.error('Ilya des champs obligatoires sont manquants.');
      return;
    }

    const is_published = sum === data?.total_mark;
    let exam_id = examenId;

    editExam({ exam_id, content: fakeData, is_published });
    confetti.onOpen();

    handleConfetti;
  };
  // useEffect(() => {
  //   if (fakeData) {
  //   }
  // }, [fakeData]);
  const handleConfetti = () => {
    confetti.onOpen();
  };
  return (
    <div className="flex h-[100vh] flex-col gap-6 p-10 overflow-auto">
      <nav className="flex justify-between w-full ">
        <div className="flex flex-col gap-4">
          {/* {isPending ? (
            <Skeleton className="w-[300px] h-[40px]" />
          ) : ( */}
          <div className="text-[#1B8392] text-2xl font-semibold ">{data?.name} </div>
          {/* )} */}
          <div className="flex items-center text-[#727272]">
            <Image src="/arrowleft.svg" alt="icons" width={20} height={20} />
            <span className="cursor-pointer">Examens</span>
            <Image src="/arrowleft.svg" alt="icons" width={20} height={20} />
            {/* {isPending ? (
              <span className="flex items-center gap-3 cursor-pointer">
                <Skeleton className="w-[80px] h-[20px]" />
                <Skeleton className="w-[80px] h-[20px]" />
                <Skeleton className="w-[80px] h-[20px]" />
              </span>
            ) : ( */}
            <div className="flex gap-1 cursor-pointer">
              {data?.exam_classess.map((item: any) => (
                <span onClick={() => router.push(`/${params?.etab_id}/classes/${item.id}`)}>
                  {item.name} ,
                </span>
              ))}
            </div>
            {/* )} */}
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
                'w-full flex items-center justify-center gap-3 pl-2 pr-2 text-sm font-semibold font-[500] leading-tight '
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
              <Image src="/redClose.svg" alt="icons" width={10} height={10} />
              Annuler
            </button>
          </div>
          {/* 
          <div className="flex items-center p-2 border rounded-lg cursor-pointer bg-[#1B8392] text-white gap-3 hover:opacity-80 ">
            <div className="flex items-center gap-3 pl-2 pr-2 text-sm font-semibold leading-tight text-center">
              <Image src="/importerIcon.svg" alt="icons" width={20} height={20} />
              Importer
            </div>
          </div> */}

          <div
            className="flex items-center p-2 border rounded-lg cursor-pointer bg-[#1B8392] text-white gap-3 hover:opacity-80 "
            onClick={handleSaveData}
          >
            <div className="flex items-center gap-3 pl-2 pr-2 text-sm font-semibold leading-tight text-center">
              <Image src={'/enregistreIcon.svg'} alt="icons" width={20} height={20} className="" />
              Enregister
            </div>
          </div>
        </div>
      </nav>
      {/* <CreateExam examId={examenId} /> */}
      {/* <EmailSend /> */}
      {isPending ? (
        <Skeleton />
      ) : (
        <CreateExam data={data} isArabic={arabic} setFakeData={setFakeData} fakeData={fakeData} />
      )}
    </div>
  );
}
