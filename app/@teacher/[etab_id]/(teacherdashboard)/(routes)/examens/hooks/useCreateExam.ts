'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createExamm as createExammApi } from '@/actions/examens';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

export function useCreateExam() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: createExam, isPending } = useMutation<
    any,
    Error,
    { data: any; user_id: string },
    any
  >(
    ({ data, user_id }) => createExammApi(data, user_id),
    {
      onSuccess: (data) => {
        const queryKeys = ['examens', 'dashExamCount'];
        queryClient.invalidateQueries(queryKeys);
        toast.success('Exam added successfully.');

        const { etab_id, ...restParams } = router.query as ParsedUrlQuery;
        router.push(
          {
            pathname: pathName + '/' + data.id,
            query: restParams,
          },
          undefined,
          { shallow: true }
        );
      },
      onError: (err) => {
        toast.error('Error creating the Exam');
      },
      retry: false,
    }
  );

  return { createExam, isPending };
}
