import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'react-hot-toast';
import { deleteClasse as deleteClasseeApi } from '@/actions/classe';

export function useDeleteClasse() {
  const queryClient = useQueryClient();

  const { mutate: deleteClasse, isPending } = useMutation({
    mutationFn: (id: number) => deleteClasseeApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classe'] });
      queryClient.invalidateQueries({ queryKey: ['dashClasses'] });
      queryClient.invalidateQueries({ queryKey: ['dashClasseCount'] });
      queryClient.invalidateQueries({ queryKey: ['dashStudentClasses'] });
      toast.success('Classe supprimé avec succès.');
    },
    onError: (err) => {
      toast.error("Une erreur est survenue lors de la suppression de l'classe.");
    },
    retry: false,
  });

  return { deleteClasse, isPending };
}
