import { UseMutationResult, UseQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateExam as updateExamApi } from '@/actions/examens';

export interface EditExamProps {
  examId: number;
  data: any;
  userId: string;
}

export function useEditExam(queryClient: UseQueryClient): UseMutationResult<void, Error, EditExamProps> {
  return useMutation(
    ({ examId, data, userId }: EditExamProps) => updateExamApi(examId, data, userId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['dashExamCount']);
        queryClient.invalidateQueries(['examens']);
        toast.success('Exame édité avec succès.');
      },
      onError: (error) => {
        toast.error('Une erreur est survenue lors de l'édition de l\'exame: ' + error.message);
      },
      retry: false,
    }
  );
}
