import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createExamCorrection as createExamCorrectionApi } from '@/actions/examens';

interface CreateExamCorrectionParams {
  exam_id: number;
  mark_obtained: number;
  user_id: string;
  correction_exam_content: any;
  status: any;
}

export function useCreateExamCorrection() {
  const queryClient = useQueryClient();
  const { mutate: createExamCorrectionn, isPending } = useMutation({
    mutationFn: ({
      exam_id,
      mark_obtained,
      user_id,
      correction_exam_content,
      status,
    }: CreateExamCorrectionParams) =>
      createExamCorrectionApi(exam_id, mark_obtained, user_id, correction_exam_content, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['examCorrections'] });
      toast.success("Correction de l'examen ajoutée avec succès.");
    },
    onError: (err) => {
      toast.error("Il y a eu une erreur lors de la création de la correction de l'examen.");
    },
    retry: false,
  });

  return { createExamCorrectionn, isPending };
}
