'use client';
import { useSidebar } from '@/store/use-sidebar';
import Sidebar from './_components/sidebar';
import { cn } from '@/lib/utils';
import Navbar from './_components/navbar';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { auth } from '@/auth';
import { getMe } from '@/actions/examens';
import { redirect, usePathname } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
type DashboardLayoutProps = {
  params?: {
    etab_id: string;
  };
  children: React.ReactNode;
};
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ params, children }) => {
  const queryClient = useQueryClient();
  const pathName = usePathname();
  console.log('🚀 ~ pathName:', pathName);
  if (params?.etab_id) {
    queryClient.setQueryData(['etab_id'], params?.etab_id);
  }

  const { data, isPending } = useQuery({
    queryKey: ['user'],
    queryFn: async () => await getMe(),
  });

  const { collapsed } = useSidebar((state) => state);

  return (
    <div className="h-full">
      {isPending ? (
        // <Skeleton className="w-full h-[100vh] bg-[#000000]" />
        <div className="w-full h-[100vh] flex items-center justify-center">
          <Image src="/loading.svg" alt="bankicon" width={400} height={400} />
        </div>
      ) : (
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
            className={cn(
              !collapsed
                ? 'pl-[225px] transition-all duration-500'
                : 'pl-[63px] transition-all duration-500'
            )}
          >
            {children}
          </main>
        </>
      )}
    </div>
  );
};

export default DashboardLayout;
