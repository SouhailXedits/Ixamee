import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'react-hot-toast';
import { updateExam as updateExamApi } from '@/actions/examens';

export function useEditExam() {
  const queryClient = useQueryClient();
  const { mutate: editExam, isPending } = useMutation({
    mutationFn: ({ exam_id, data, user_id }: { exam_id: number; data: any; user_id: string }) =>
      updateExamApi(exam_id, data, user_id), // Call your API function to update the exam
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashExamCount'] });
      queryClient.invalidateQueries({ queryKey: ['examens'] });
      toast.success('Exame édité avec succès.');
    },
    onError: (err) => {
      console.log('ERROR', err);
      toast.error("Une erreur est survenue lors de l'édition de l'exame.");
    },
    retry: false,
  });

  return { editExam, isPending };
}
