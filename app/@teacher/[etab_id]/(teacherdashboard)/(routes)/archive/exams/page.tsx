"use client"
import { useQuery, useQueryClient } from '@tanstack/react-query';
import ArchiverCard from '../components/ArchivedCard';
import { getAllArchivedExams } from '@/actions/archive';
import { Skeleton } from '@/components/ui/skeleton';
import { useParams } from 'next/navigation';

const FakeExamData = [
  {
    id: 9,
    name: 'DC1',
    archived_at: '12/03/2023',
    class: '2ème info 3',
  },
  {
    id: 1,
    name: 'DC2',
    archived_at: '12/03/2023',
    class: '2ème info 2',
  },
  {
    id: 2,
    name: 'DC3',
    archived_at: '12/03/2023',
    class: '3ème info 2',
  },
  {
    id: 3,
    name: 'DS1',
    archived_at: '12/03/2023',
    class: '4ème info 2',
  },
  {
    id: 4,
    name: 'DC4',
    archived_at: '12/03/2023',
    class: '4ème info 2',
  },
];

function ExamsLayout() {
    const queryClient = useQueryClient();
    const user = queryClient.getQueryData<any>(['user']);
    const params = useParams();
    const estabId = params.etab_id;
    const {
      data: exams,
      error,
      isPending,
    } = useQuery<any>({
      queryKey: ['archived_exams', 1],
      queryFn: async () => await getAllArchivedExams(user.id, +estabId),
    });
    if (isPending)
      return (
        <div className=" flex gap-3">
          <Skeleton className="w-[275px] h-[190px]" />
          <Skeleton className="w-[275px] h-[190px]" />
          <Skeleton className="w-[275px] h-[190px]" />
        </div>
      );
    const data = exams?.data || [];
    console.log(data);
  return (
    <div className=" flex gap-7 flex-wrap">
      {data.map((exam: any) => (
        <ArchiverCard data={exam} key={exam.id} />
      ))}
    </div>
  );
}

export default ExamsLayout;
