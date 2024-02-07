'use client';
import { useSidebar } from '@/store/use-sidebar';
import { cn } from '@/lib/utils';
import { useQueryClient } from '@tanstack/react-query';

import { getMe } from '@/actions/examens';

import Navbar from '@/components/shared-components/navbar';
import Sidebar from './components/sidebar';
type DashboardLayoutProps = {
  params?: {
    class_id: string;
  };
  children: React.ReactNode;
};
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ params, children }) => {
  const queryClient = useQueryClient();

  if (params?.class_id) {
    queryClient.setQueryData(['class_id'], params?.class_id);
  }
  queryClient.prefetchQuery({
    queryKey: ['user'],
    queryFn: async () => await getMe(),
  });

  // const { data, isPending } = useQuery({
  //   queryKey: ['user'],
  //   queryFn: async () => await getMe(),
  //   // staleTime: 0,
  // });

  // const { data: teachersubject, isPending: isPendingSubject } = useQuery<any>({
  //   queryKey: ['teachersubjects'],
  //   queryFn: async () => await getSubjectOfUserById(data?.id as string),
  //   staleTime: 0,
  // });

  const { collapsed } = useSidebar((state) => state);

  return (
    <div className="h-full">
      <>
        <div
          className={cn(
            'fixed inset-y-0 z-50 flex-col hidden h-full w-[220px] md:flex transition-width duration-300',
            collapsed && 'w-[60px]'
          )}
        >
          <Sidebar isOpen={collapsed} />
        </div>
        <div>
          <Navbar />
        </div>
        <main
          className={
            (cn(
              !collapsed
                ? 'pl-[225px] transition-all duration-500 pt-[60px]'
                : 'pl-[63px] transition-all duration-500 pt-[60px]'
            ))
          }
        >
          {children}
        </main>
      </>
    </div>
  );
};

export default DashboardLayout;


