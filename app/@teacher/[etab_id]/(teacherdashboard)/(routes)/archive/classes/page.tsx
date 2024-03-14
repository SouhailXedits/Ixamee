'use client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import ArchiverCard from '../components/ArchivedCard';
import { getAllArchivedClasses } from '@/actions/archive';
import { Skeleton } from '@/components/ui/skeleton';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import Pagination from '@/components/shared-components/Pagination';

function ClassesLayout() {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<any>(['user']);
  const params = useParams();
  const estabId = params.etab_id;

  const filters = queryClient.getQueryData(['a-classes-filters']);
  const {
    data: classes,
    error,
    isPending,
  } = useQuery<any>({
    queryKey: ['archived_classes', 1, filters],
    queryFn: async () => await getAllArchivedClasses(user.id, +estabId, filters),
  });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  if (isPending)
    return (
      <div className="flex gap-3 ">
        <Skeleton className="w-[275px] h-[190px]" />
        <Skeleton className="w-[275px] h-[190px]" />
        <Skeleton className="w-[275px] h-[190px]" />
      </div>
    );
  const data = classes?.data || [];
  const reformedData = data.map((classe: any) => {
    return {
      id: classe.id,
      name: classe.name,
      archived_at: classe.archived_at,
      number_students: classe.student_class.length,
    };
  });
  if (reformedData.length === 0)
    return (
      <p>
        Pas de classes archivés pour le moment.
        <br />
        N’oubliez pas d’archiver les classes non actifs.
      </p>
    );

  const totalPages = Math.ceil(reformedData?.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = reformedData?.slice(startIndex, endIndex);

  return (
    <div className=' flex flex-col h-full justify-between gap-10'>
      <div className="flex flex-wrap gap-7">
        {paginatedData.map((classe: any) => (
          <ArchiverCard data={classe} key={classe.id} />
        ))}
      </div>
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  );
}

export default ClassesLayout;
