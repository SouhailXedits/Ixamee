'use client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import ArchiverCard from '../components/ArchivedCard';
import { getAllArchivedExams } from '@/actions/archive';
import { Skeleton } from '@/components/ui/skeleton';
import { useParams } from 'next/navigation';
import Pagination from '@/components/shared-components/Pagination';
import { useState } from 'react';
import { useSearchQuery } from '@/store/use-search-query';

function ExamsLayout() {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<any>(['user']);
  const params = useParams();
  const estabId = params.etab_id;
  const { name } = useSearchQuery();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;
  const filters = queryClient.getQueryData(['a-exams-filters']) as any;

  const {
    data: exams,
    error,
    isPending,
  } = useQuery<any>({
    queryKey: ['archived_exams', estabId, name, filters],
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

  let filteredData = [];

  if (filters?.classe === 'tous') {
    filteredData = data;
  } else {
    filteredData =
      (filters?.classe &&
        data.filter((exam: any) =>
          exam.exam_classess.some((classe: any) => classe.id === +filters.classe)
        )) ||
      data;
  }

  const filteredByArchivedDateRange = filters?.dateRange
    ? filteredData.filter((exam: any) => {
        const examDate = new Date(exam.archived_at);
        const startDate = new Date(filters.dateRange.from);
        const endDate = new Date(filters.dateRange.to);
        return examDate >= startDate && examDate <= endDate;
      })
    : filteredData;
  const filteredByDateRange = filters?.created_at
    ? filteredByArchivedDateRange.filter((exam: any) => {
        const examDate = new Date(exam.create_at);
        const startDate = new Date(filters.created_at.from);
        const endDate = new Date(filters.created_at.to);
        return examDate >= startDate && examDate <= endDate;
      })
    : filteredByArchivedDateRange;

  const totalPages = Math.ceil(data?.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filteredByDateRange?.slice(startIndex, endIndex);
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
