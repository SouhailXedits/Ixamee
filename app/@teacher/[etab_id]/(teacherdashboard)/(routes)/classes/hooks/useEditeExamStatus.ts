import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { editeExamStatus as editeExamStatusApi } from '@/actions/examens';

interface CreateExamCorrectionParams {
  exam_id: any;
  user_id: any;
  status: 'notClassified' | 'absent';
}

export function useEditeExamStatus() {
  const queryClient = useQueryClient();
  const { mutate: editeStatus, isPending } = useMutation({
    mutationFn: ({ exam_id, user_id, status }: CreateExamCorrectionParams) =>
      editeExamStatusApi({ exam_id, user_id, status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userCorrection'] });
      toast.success("Correction de l'examen ajoutée avec succès.");
    },
    onError: (err) => {
      toast.error("Il y a eu une erreur lors de la création de la correction de l'examen.");
    },
    retry: false,
  });

  return { editeStatus, isPending };
}
