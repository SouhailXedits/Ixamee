'use client';
import Image from 'next/image';
import { RadioGroup } from '@radix-ui/react-radio-group';
import { EtablissementItem } from './etablissement-item';
import { useSidebar } from '@/store/use-sidebar';
import { cn } from '@/lib/utils';
import { getEstablishmentOfUser } from '@/actions/examens';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
const Etablissement = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']) as any;

  const { collapsed } = useSidebar((state) => state);

  const { data: teacherEstab, isPending: isPendingTeacherEstab } = useQuery({
    queryKey: ['AllEstabOfUser'],
    queryFn: async () => await getEstablishmentOfUser(user?.id),
    staleTime: 0,
  });

  return (
    <div className="border-t border-[#99C6D3] max-h-50">
      <div className="flex items-center gap-3 p-4">
        <Image src="/bankicon.svg" alt="bankicon" width={18} height={18} />
        <span className={cn('text-[#99C6D3]', collapsed && 'hidden')}>Établissement</span>
      </div>
      {isPendingTeacherEstab ? (
        <div className="flex flex-col gap-4 overflow-x-auto overflow-y-hidden max-h-52">
          <Skeleton className="w-full h-[20px]" />
          <Skeleton className="w-full h-[20px]" />
          <Skeleton className="w-full h-[20px]" />
        </div>
      ) : (
        <div className="overflow-x-auto max-h-52">
          <EtablissementItem data={teacherEstab} />
        </div>
      )}
    </div>
  );
};

export default Etablissement;
