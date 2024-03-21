import { UseMutationResult, UseQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { editExamFeedback as editExamFeedbackApi } from '@/actions/examens';

interface EditExamCorrectionParams {
  examId: string;
  studentId: string;
  newFeedback: string;
}

export function useEditExamFeedback(): UseMutationResult<void, Error, EditExamCorrectionParams> {
  const queryClient = useQueryClient();

  return useMutation(
    ({ examId, studentId, newFeedback }: EditExamCorrectionParams) => editExamFeedbackApi({ examId, studentId, newFeedback }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['userCorrection'] });
        toast.success('Exam correction added successfully.');
      },
      onError: (error) => {
        toast.error('An error occurred while creating the exam correction.');
      },
      retry: false,
    }
  );
}
