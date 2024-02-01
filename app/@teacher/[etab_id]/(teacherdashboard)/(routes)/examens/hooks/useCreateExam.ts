'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'react-hot-toast';
import { createExamm as createExammApi } from '@/actions/examens';
import { useParams, usePathname, useRouter } from 'next/navigation';

export function useCreateExam() {
  const queryClient = useQueryClient();
  const params = useParams();
  const pathName = usePathname();
  const router = useRouter();
  const { mutate: creatExam, isPending } = useMutation({
    mutationFn: ({ data, user_id }: { data: any; user_id: string }) =>
      createExammApi(data, user_id),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['examens'] });
      queryClient.invalidateQueries({ queryKey: ['dashExamCount'] });
      toast.success('Exam ajoute avec succès.');
      if (pathName.includes('/examens')) {
        console.log('immm');
        router.push(pathName + '/' + data.id);
      } else {
        router.push(params.etab_id + '/examens/' + data.id);
      }
    },
    onError: (err) => {
      console.log('ERROR', err);
      toast.error('There was an error creating the Exam');
    },
    retry: false,
  });

  return { creatExam, isPending };
}
