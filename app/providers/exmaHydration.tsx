'use server';
import { GetOneExamByIdResponse } from '@/actions/examens';
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default function ExmaHydration({
  children,
  exam_id,
}: {
  children: React.ReactNode;
  exam_id: string;
}) {
  const queryClient = new QueryClient();

  queryClient.prefetchQuery<GetOneExamByIdResponse>(
    ['examenById', exam_id],
    {
      queryFn: async () => await getOneExamById({ id: exam_id }),
      staleTime: 60 * 60 * 1000, // 1 hour
      select: (data) => data.exam,
    }
  );

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}

