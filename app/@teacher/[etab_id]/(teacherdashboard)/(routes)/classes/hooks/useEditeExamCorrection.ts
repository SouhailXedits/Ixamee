import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createNoteExamCorrectio as createExamCorrectionApi } from '@/actions/examens';

interface CreateExamCorrectionParams {
  exam_id: any;
  mark_obtained: any;
  user_id: any;
}

export function useCreateExamCorrection() {
  const queryClient = useQueryClient();
  const { mutate: createExamCorrectionn, isPending } = useMutation({
    mutationFn: ({ exam_id, mark_obtained, user_id }: CreateExamCorrectionParams) =>
      createExamCorrectionApi({ exam_id, mark_obtained, user_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userCorrection'] });
      toast.success("Correction de l'examen ajoutée avec succès.");
    },
    onError: (err) => {
      toast.error("Il y a eu une erreur lors de la création de la correction de l'examen.");
    },
    retry: false,
  });

  return { createExamCorrectionn, isPending };
}
