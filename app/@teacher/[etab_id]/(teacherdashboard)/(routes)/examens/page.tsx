'use client';
import ExamCardsLayout from './_components/ExamCardsLayout';
import Heading from './_components/Heading';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllExam, getEstablishmentOfUser } from '@/actions/examens';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import Pagination from '@/components/shared-components/Pagination';
export default function Examens() {
  const params = useParams();
  const queryClient = useQueryClient();
  // const etab_id = queryClient.getQueryData(['etab_id']) as number;
  const user = queryClient.getQueryData(['user']) as any;
    const etab_id = +params.etab_id;
  // const data = queryClient.getQueryData(['examens', etab_id]) as any;
  const user_id = user?.id;

  const { data, isPending } = useQuery({
    queryKey: ['examens', etab_id],
    queryFn: async () => await getAllExam({ user_id, etab_id }),
    retry: true,
  });

  const [dataInput, setDataInput] = useState('');
  // const { data, isPending } = useQuery({
  //   queryKey: ['examens', etab_id],
  //   queryFn: async () => await getAllExam({ user_id: user?.id, etab_id }),
  // });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;
  const filteredData = data?.filter((exam: any) => {
    const examName = exam.name.toLowerCase();
    return examName.includes(dataInput.toLowerCase());
  });


   const totalPages =filteredData?.length && Math.ceil(filteredData?.length / pageSize) || 0;
   const startIndex = (currentPage - 1) * pageSize;
   const endIndex = startIndex + pageSize;
   const paginatedData = filteredData?.slice(startIndex, endIndex);



  return (
    <div className="flex flex-col gap-6 p-10 h-full">
      <Heading data={dataInput} setData={setDataInput} />
      {isPending ? (
        <div className="flex justify-between item-center w-full h-[80px] ">
          <div className="flex flex-wrap gap-4 item-center">
            <Skeleton className="w-[300px] h-[250px]"></Skeleton>
            <Skeleton className="w-[300px] h-[250px]"></Skeleton>

            <Skeleton className="w-[300px] h-[250px]"></Skeleton>
            <Skeleton className="w-[300px] h-[250px]"></Skeleton>
            <Skeleton className="w-[300px] h-[250px]"></Skeleton>
          </div>
        </div>
      ) : (
        <div className=' flex flex-col gap-10 justify-between h-full' >
          <ExamCardsLayout isPending={isPending} data={paginatedData} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
