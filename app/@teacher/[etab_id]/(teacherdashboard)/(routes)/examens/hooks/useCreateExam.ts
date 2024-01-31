'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'react-hot-toast';
import { createExamm as createExammApi } from '@/actions/examens';
import { usePathname, useRouter } from 'next/navigation';

export function useCreateExam() {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  console.log(pathname);
  const router = useRouter();
  const { mutate: creatExam, isPending } = useMutation({
    mutationFn: ({ data, user_id }: { data: any; user_id: string }) =>
      createExammApi(data, user_id),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['examens'] });
      toast.success('Exam ajoute avec succès.');
      router.push(pathname + '/' + data.id);
    },
    onError: (err) => {
      console.log('ERROR', err);
      toast.error('There was an error creating the Exam');
    },
    retry: false,
  });

  return { creatExam, isPending };
}
