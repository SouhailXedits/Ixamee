'use client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import ArchiverCard from '../components/ArchivedCard';
import { getAllArchivedExams } from '@/actions/archive';
import { Skeleton } from '@/components/ui/skeleton';
import { useParams } from 'next/navigation';
import Pagination from '@/components/shared-components/Pagination';
import { useState } from 'react';
import { useSearchQuery } from '@/store/use-search-query';

function ExamsLayout({ filters }: any) {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<any>(['user']);
  const params = useParams();
  const estabId = params.etab_id;
  const {name} = useSearchQuery()
  console.log(name)
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;
  const {
    data: exams,
    error,
    isPending,
  } = useQuery<any>({
    queryKey: ['archived_exams', estabId, name],
    queryFn: async () => await getAllArchivedExams(user.id, +estabId, name),
  });
  if (isPending)
    return (
      <div className="flex gap-3 ">
        <Skeleton className="w-[275px] h-[190px]" />
        <Skeleton className="w-[275px] h-[190px]" />
        <Skeleton className="w-[275px] h-[190px]" />
      </div>
    );
  const data = exams?.data || [];

  if (data.length === 0)
    return (
      <p>
        Pas d’examens archivés pour le moment.
        <br />
        N’oubliez pas d’archiver les examens non actifs.
      </p>
    );

  const totalPages = Math.ceil(data?.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = data?.slice(startIndex, endIndex);
  return (
    <div className=" flex flex-col h-full justify-between gap-10">
      <div className="flex flex-wrap gap-7">
        {paginatedData.map((classe: any) => (
          <ArchiverCard data={classe} key={classe.id} />
        ))}
      </div>
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  );
}

export default ExamsLayout;
