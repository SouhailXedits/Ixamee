'use server';
import { getAllClasse } from '@/actions/classe';
import {
  getCountOfStudentExams,
  getCountOfStudentSubjects,
  getStudentMarksheet,
} from '@/actions/dashboard';
import {
  getAllExam,
  getClasseOfUser,
  getEstablishmentOfUser,
  getMe,
  getSubjectOfUser,
  getSubjectOfUserById,
  getTermOfUser,
} from '@/actions/examens';
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function NewHydration({
  children,
  etab_id,
  user_id,
}: {
  children: React.ReactNode;
  etab_id: any;
  user_id: any;
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['examens', etab_id],
    queryFn: async () => await getAllExam({ user_id, etab_id }),

  });
  await queryClient.prefetchQuery({
    queryKey: ['teacherEstab'],
    queryFn: async () => await getEstablishmentOfUser(user_id),

  });

  await queryClient.prefetchQuery({
    queryKey: ['teacherTerm'],
    queryFn: async () => await getTermOfUser(user_id),

  });
  await queryClient.prefetchQuery({
    queryKey: ['classe', etab_id],
    queryFn: async () => await getAllClasse({ user_id, etab_id }),

  });

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}
