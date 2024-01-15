import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-hot-toast';
import { deleteSubject as deleteSubjectApi  } from '@/actions/subjects';

export function useDeleteSubject() {
  const queryClient = useQueryClient();

  const { mutate: deleteSubject, isPending } = useMutation({
    mutationFn: (id: number) => deleteSubjectApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['estabs'] });
      toast.success('Établissement supprimé avec succès.');
    },
    onError: (err) => {
      console.log('ERROR', err);
      toast.error("Une erreur est survenue lors de la suppression de l'établissement.");
    },
    retry: false,
  });

  return { deleteSubject, isPending };
}
