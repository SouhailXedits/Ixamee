'use server';

import { getAllExam, getEstablishmentOfUser, getMe, getSubjectOfUserById } from '@/actions/examens';
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function Hydration({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['user'],
    queryFn: async () => await getMe(),
  });

  const user = queryClient.getQueryData(['user']) as any;
  await queryClient.prefetchQuery({
    queryKey: ['AllEstabOfUser'],
    queryFn: async () => await getEstablishmentOfUser(user?.id),
  });

  await queryClient.prefetchQuery({
    queryKey: ['teacherSubject'],
    queryFn: async () => await getSubjectOfUserById(user?.id),
  });

  // await queryClient.prefetchQuery({
  //   queryKey: ['examens'],
  //   queryFn: async () => await getAllExam(),
  // });
  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}
