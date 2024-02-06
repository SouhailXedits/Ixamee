'use client';
import Image from 'next/image';
import { RadioGroup } from '@radix-ui/react-radio-group';
import { useSidebar } from '@/store/use-sidebar';
import { cn } from '@/lib/utils';
import { getEstablishmentOfUser } from '@/actions/examens';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { SideBarRadioItem } from '@/components/shared-components/SideBarRadioItem';
import { getClassesOfUser } from '@/data/user';
const Etablissement = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']) as any;

  const { collapsed } = useSidebar((state) => state);

  const { data: userClasses, isPending: isPendingTeacherEstab } = useQuery({
    queryKey: ['user-classes'],
    queryFn: async () => await getClassesOfUser(user?.id),
  }) as any;


  return (
    <div className="border-t border-[#99C6D3] max-h-50">
      <div className="flex items-center gap-3 p-4">
        <Image src="/bankicon.svg" alt="bankicon" width={18} height={18} />
        <span className={cn('text-[#99C6D3]', collapsed && 'hidden')}>Classe</span>
      </div>
      {isPendingTeacherEstab ? (
        <div className="flex flex-col gap-4 overflow-x-auto overflow-y-hidden max-h-52">
          <Skeleton className="w-full h-[20px]" />
          <Skeleton className="w-full h-[20px]" />
          <Skeleton className="w-full h-[20px]" />
        </div>
      ) : (
        <div className="overflow-x-auto max-h-52">
          <SideBarRadioItem data={userClasses} />
        </div>
      )}
    </div>
  );
};

export default Etablissement;
