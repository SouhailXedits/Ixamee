'use server';

import {
  getCountOfStudentExams,
  getCountOfStudentSubjects,
  getStudentMarksheet,
} from '@/actions/dashboard';
import { getAllExam, getEstablishmentOfUser, getMe, getSubjectOfUserById } from '@/actions/examens';
import { getAllSubjectsByClasseIdByPage } from '@/actions/subjects';
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export default async function Hydration({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  // const params = useParams();
  // const id = params.etab_id;
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
  const allSubjects = queryClient.getQueryData(['teacherSubject']) as any;

  
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
