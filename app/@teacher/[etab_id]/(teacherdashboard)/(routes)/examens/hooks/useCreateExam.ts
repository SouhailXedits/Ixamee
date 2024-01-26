import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'react-hot-toast';
import { createExamm as createExammApi } from '@/actions/examens';

export function useCreateExam() {
  const queryClient = useQueryClient();

  const { mutate: creatExam, isPending } = useMutation({
    mutationFn: ({ data, user_id }: { data: any; user_id: string }) =>
      createExammApi(data, user_id),
    onSuccess: ({data}:any) => {
      console.log(data)
      queryClient.invalidateQueries({ queryKey: ['examens'] });
      toast.success('Exam ajoute avec succès.');
    },
    onError: (err) => {
      console.log('ERROR', err);
      toast.error('There was an error creating the Exam');
    },
    retry: false,
  });

  return { creatExam, isPending };
}
