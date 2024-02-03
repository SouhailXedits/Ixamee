import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { sendRankOfUserExam as sendRankOfUserExamBatchApi } from '@/actions/examens';

interface CreateExamCorrectionParams {
  exam_id: string;
  marks: any;
}

export function useSendExamMark() {
  const queryClient = useQueryClient();
  const { mutate: sendExamMark, isPending } = useMutation({
    mutationFn: ({ exam_id, marks }: CreateExamCorrectionParams) =>
      sendRankOfUserExamBatchApi({ exam_id, marks }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userCorrection'] });
      toast.success("Correction de l'examen ajoutée avec succès.");
    },
    onError: (err: any) => {
      toast.error("Il y a eu une erreur lors de la création de la correction de l'examen.");
    },
    retry: false,
  });

  return { sendExamMark, isPending };
}
