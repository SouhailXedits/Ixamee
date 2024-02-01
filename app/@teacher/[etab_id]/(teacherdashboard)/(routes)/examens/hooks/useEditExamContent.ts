import { updateExamContent as updateExamContentApi } from '@/actions/examens';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'react-hot-toast';

export function useEditExamContent() {
  const queryClient = useQueryClient();
  const { mutate: editExam, isPending } = useMutation({
    mutationFn: ({ exam_id, content }: { exam_id: string; content: any }) =>
      updateExamContentApi(exam_id, content), // Call your API function to update the exam
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ['examenById']   });
      queryClient.invalidateQueries({ queryKey: ['dashExamCount'] });
      toast.success('Exame Enregistre avec succès.');
    },
    onError: (err) => {
      console.log('ERROR', err);
      toast.error("Une erreur est survenue lors de l'édition de l'exame.");
    },
    retry: false,
  });

  return { editExam, isPending };
}
