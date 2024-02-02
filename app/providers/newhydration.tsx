'use server';
import {
  getCountOfStudentExams,
  getCountOfStudentSubjects,
  getStudentMarksheet,
} from '@/actions/dashboard';
import { getEstablishmentOfUser, getMe, getSubjectOfUserById } from '@/actions/examens';
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function NewHydration({
  children,
  etab_id,
}: {
  children: React.ReactNode;
  etab_id: any;
}) {
  console.log(etab_id);
  const queryClient = new QueryClient();

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}
