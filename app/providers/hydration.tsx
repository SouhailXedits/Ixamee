'use server';
import {
  getCountOfStudentExams,
  getCountOfStudentSubjects,
  getStudentMarksheet,
} from '@/actions/dashboard';
import { getEstablishmentOfUser, getMe, getSubjectOfUserById } from '@/actions/examens';
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function Hydration({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  const user = queryClient.getQueryData(['user']) as any;

  await queryClient.prefetchQuery({
    queryKey: ['AllEstabOfUser'],
    queryFn: async () => await getEstablishmentOfUser(user?.id),
  });
  await queryClient.prefetchQuery({
    queryKey: ['teacherSubject'],
    queryFn: async () => await getSubjectOfUserById(user?.id),
  });
  
  await queryClient.prefetchQuery({
    queryKey: ['subjectCount'],
    queryFn: async () => await getCountOfStudentSubjects(user.id),
  });
  await queryClient.prefetchQuery({
    queryKey: ['marksheetCount'],
    queryFn: async () => await getStudentMarksheet(user.id),
  });
  await queryClient.prefetchQuery({
    queryKey: ['examCount'],
    queryFn: async () => await getCountOfStudentExams(user.id),
  });

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}
