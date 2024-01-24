'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import CreateExam from './_components/create-exam';
import { useQuery } from '@tanstack/react-query';
import { getOneExamById } from '@/actions/examens';
import { Skeleton } from '@/components/ui/skeleton';
// import { EmailSend } from './_components/test';
// import { Editor } from './_components/toolbar-editor';

export default function page({ params }: { params: { examenId: string } }) {
  const { examenId } = params;
  console.log(examenId);
  const { data, isPending } = useQuery({
    queryKey: ['examenById'],
    queryFn: async () => await getOneExamById({ id: examenId }),
  });
  console.log(data);
  const handleClick = () => {
    console.log('click');
  };

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
          <div className="flex items-center gap-3 p-2 border rounded-lg cursor-pointer border-[#F04438] text-[#F04438] hover:opacity-80 ">
            <div className="flex items-center gap-3 pl-2 pr-2 text-sm font-semibold leading-tight text-center">
              <Image src="/redcloseicon2.svg" alt="icons" width={10} height={10} />
              Annuler
            </div>
          </div>

          <div className="flex items-center p-2 border rounded-lg cursor-pointer bg-[#1B8392] text-white gap-3 hover:opacity-80 ">
            <div className="flex items-center gap-3 pl-2 pr-2 text-sm font-semibold leading-tight text-center">
              <Image src="/importerIcon.svg" alt="icons" width={20} height={20} />
              Importer
            </div>
          </div>

          <div className="flex items-center p-2 border rounded-lg cursor-pointer bg-[#1B8392] text-white gap-3 hover:opacity-80 ">
            <div className="flex items-center gap-3 pl-2 pr-2 text-sm font-semibold leading-tight text-center">
              <Image src={'/enregistreIcon.svg'} alt="icons" width={20} height={20} className="" />
              Enregister
            </div>
          </div>
        </div>
      </nav>
      {/* <CreateExam examId={examenId} /> */}
      {/* <EmailSend /> */}

      <CreateExam data={data} />
    </div>
  );
}
