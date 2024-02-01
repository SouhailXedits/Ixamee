import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'react-hot-toast';
import { deleteExame as deleteExameApi } from '@/actions/examens';

export function useDeleteExam() {
  const queryClient = useQueryClient();

  const { mutate: deleteExam, isPending } = useMutation({
    mutationFn: (id: number) => deleteExameApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashExamCount'] });
      queryClient.invalidateQueries({ queryKey: ['examens'] });
      toast.success('Exam supprimé avec succès.');
    },
    onError: (err) => {
      console.log('ERROR', err);
      toast.error("Une erreur est survenue lors de la suppression de l'établissement.");
    },
    retry: false,
  });

  return { deleteExam, isPending };
}
