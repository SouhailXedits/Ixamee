'use server';
import { getAllClasse, getClasseById, getStudentOfClasse } from '@/actions/classe';
import {
  getCountOfStudentExams,
  getCountOfStudentSubjects,
  getStudentMarksheet,
} from '@/actions/dashboard';
import {
  getAllExam,
  getClasseOfUser,
  getEstablishmentOfUser,
  getIdOfUserInTheClasse,
  getMe,
  getSubjectOfUser,
  getSubjectOfUserById,
  getTermOfUser,
} from '@/actions/examens';
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function ClassHydration({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { etab_id: string; classesId: string };
}) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['getIdOfUserInTheClasse'],
    queryFn: async () => await getIdOfUserInTheClasse(+params.classesId),
  });
  await queryClient.prefetchQuery({
    queryKey: ['classe', params.etab_id],
    queryFn: async () => await getClasseById(+params.classesId),
  });

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}
