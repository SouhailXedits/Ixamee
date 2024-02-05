'use client';
import ExamCardsLayout from './_components/ExamCardsLayout';
import Heading from './_components/Heading';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllExam, getEstablishmentOfUser } from '@/actions/examens';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';
export default function Examens() {
  const queryClient = useQueryClient();
  const etab_id = queryClient.getQueryData(['etab_id']) as number;
  const user = queryClient.getQueryData(['user']) as any;
  const data = queryClient.getQueryData(['examens', etab_id]) as any;

  const [dataInput, setDataInput] = useState('');
  // const { data, isPending } = useQuery({
  //   queryKey: ['examens', etab_id],
  //   queryFn: async () => await getAllExam({ user_id: user?.id, etab_id }),
  // });
  const filteredData = data?.filter((exam: any) => {
    const examName = exam.name.toLowerCase();
    return examName.includes(dataInput.toLowerCase());
  });

  return (
    <div className="flex flex-col gap-6 p-10">
      <Heading data={dataInput} setData={setDataInput} />
      {/* ) : (
        <div className="flex justify-between item-center w-full h-[80px] ">
          <div className="flex gap-4 item-center">
            <Skeleton className="w-[200px] h-[60px]"></Skeleton>
            <Skeleton className="w-[200px] h-[60px]" />
          </div>
          <div className="flex gap-6 item-center">
            <Skeleton className="w-[200px] h-[60px]" />
            <Skeleton className="w-[200px] h-[60px]" />
          </div>
        </div> */}
      <ExamCardsLayout isPending={false} data={filteredData} />
    </div>
  );
}
