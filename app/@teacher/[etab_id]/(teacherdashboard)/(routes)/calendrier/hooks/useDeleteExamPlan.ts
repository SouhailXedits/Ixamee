import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'react-hot-toast';
import { deleteExamPlan as deleteExamPlanApi } from '@/actions/exam-plans';

export function useDeleteExamPlan() {
  const queryClient = useQueryClient();

  const { mutate: deleteExamPlan, isPending } = useMutation({
    mutationFn: (id: number) => deleteExamPlanApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success('Établissement supprimé avec succès.');
    },
    onError: (err) => {
      toast.error("Une erreur est survenue lors de la suppression de l'établissement.");
    },
    retry: false,
  });

  return { deleteExamPlan, isPending };
}
