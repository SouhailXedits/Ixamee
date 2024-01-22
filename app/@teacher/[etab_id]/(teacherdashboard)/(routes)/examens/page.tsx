'use client';
import ExamCardsLayout from './_components/ExamCardsLayout';
import Heading from './_components/Heading';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllExam, getEstablishmentOfUser } from '@/actions/examens';
import { Skeleton } from '@/components/ui/skeleton';
export default function Examens() {
  const queryClient = useQueryClient();
  const etab_id = queryClient.getQueryData(['etab_id']) as number;
  const user = queryClient.getQueryData(['user']) as any;

  const { data, isPending } = useQuery({
    queryKey: ['examens'],
    queryFn: async () => await getAllExam({ user_id: user?.id, etab_id }),
  });
  return (
    <div className="flex flex-col gap-6 p-10">
      {!isPending ? (
        <Heading />
      ) : (
        <div className="flex justify-between item-center w-full h-[80px] ">
          <div className="flex gap-4 item-center">
            <Skeleton className="w-[200px] h-[60px]"></Skeleton>
            <Skeleton className="w-[200px] h-[60px]" />
          </div>
          <div className="flex gap-6 item-center">
            <Skeleton className="w-[200px] h-[60px]" />
            <Skeleton className="w-[200px] h-[60px]" />
          </div>
        </div>
      )}
      <ExamCardsLayout isPending={isPending} data={data} />
    </div>
  );
}
