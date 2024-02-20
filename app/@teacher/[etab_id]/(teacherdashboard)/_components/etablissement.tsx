'use client';
import Image from 'next/image';
import { SideBarRadioItem } from '@/components/shared-components/SideBarRadioItem';
import { useSidebar } from '@/store/use-sidebar';
import { cn } from '@/lib/utils';
import { getEstablishmentOfUser } from '@/actions/examens';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
const Etablissement = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']) as any;
  // const teacherEstab = queryClient.getQueryData(['AllEstabOfUser']) as any;

  const { data: teacherEstab, isLoading } = useQuery({
    queryKey: ['AllEstabOfUser'],
    queryFn: () => getEstablishmentOfUser(user?.id),
  });

  const { collapsed } = useSidebar((state) => state);

  return (
    <div className="border-t border-[#99C6D3] max-h-50">
      <div className="flex items-center gap-3 p-4">
        <Image src="/bankicon.svg" alt="bankicon" width={18} height={18} />
        <span className={cn('text-[#99C6D3]', collapsed && 'hidden')}>Établissements</span>
      </div>
      {!teacherEstab ? (
        <div className="flex flex-col gap-4 overflow-x-auto overflow-y-hidden max-h-52">
          <Skeleton className="w-full h-[20px]" />
          <Skeleton className="w-full h-[20px]" />
          <Skeleton className="w-full h-[20px]" />
        </div>
      ) : (
        <div className="overflow-x-auto max-h-52">
          <SideBarRadioItem data={teacherEstab} />
        </div>
      )}
    </div>
  );
};

export default Etablissement;
