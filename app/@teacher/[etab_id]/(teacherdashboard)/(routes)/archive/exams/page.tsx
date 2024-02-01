"use client"
import { useQuery, useQueryClient } from '@tanstack/react-query';
import ArchiverCard from '../components/ArchivedCard';
import { getAllArchivedExams } from '@/actions/archive';
import { Skeleton } from '@/components/ui/skeleton';
import { useParams } from 'next/navigation';


function ExamsLayout({filters} : any) {
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
    if(data.length === 0) return (
      <p>
        Pas d’examens archivés pour le moment.<br/>N’oubliez pas d’archiver les examens non actifs.
      </p>
    );
  return (
    <div className=" flex gap-7 flex-wrap">
      {data.map((exam: any) => (
        <ArchiverCard data={exam} key={exam.id} />
      ))}
    </div>
  );
}

export default ExamsLayout;
