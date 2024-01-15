'use server';
import { getAllExam, getEstablishmentOfUser, getMe } from '@/actions/examens';
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function Hydration({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['user'],
    queryFn: async () => await getMe(),
  });

  // await queryClient.prefetchQuery({
  //   queryKey: ['examens'],
  //   queryFn: async () => await getAllExam(),
  // });
  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}
