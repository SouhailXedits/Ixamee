import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { editeExamFeedback as editeExamFeedbackApi } from '@/actions/examens';

interface CreateExamCorrectionParams {
  exam_id: any;
  user_id: any;
  newFeedback: any;
}

export function useEditeExamFeedback() {
  const queryClient = useQueryClient();
  const { mutate: editeFeedback, isPending } = useMutation({
    mutationFn: ({ exam_id, user_id, newFeedback }: CreateExamCorrectionParams) =>
      editeExamFeedbackApi({ exam_id, user_id, newFeedback }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userCorrection'] });
      toast.success("Correction de l'examen ajoutée avec succès.");
    },
    onError: (err) => {
      toast.error("Il y a eu une erreur lors de la création de la correction de l'examen.");
    },
    retry: false,
  });

  return { editeFeedback, isPending };
}
