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
  getMe,
  getOneExamById,
  getSubjectOfUser,
  getSubjectOfUserById,
  getTermOfUser,
} from '@/actions/examens';
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function ExmaHydration({
  children,
  exam_id,
}: {
  children: React.ReactNode;
  exam_id: string;
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['examenById', exam_id],
    queryFn: async () => await getOneExamById({ id: exam_id }),
  });

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}
