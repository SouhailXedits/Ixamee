import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'react-hot-toast';
import { deleteUserInClasse as DeleteUserInClasseApi } from '@/actions/classe';

export function useDeleteUserInClasse() {
  const queryClient = useQueryClient();

  const { mutate: deleteUser, isPending } = useMutation({
    mutationFn: ({ user_id, classe_id, exam_id }: any) =>
      DeleteUserInClasseApi(user_id, classe_id, exam_id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userOfClasses'] });
      toast.success('etudiant supprimé avec succès.');
    },
    onError: (err) => {
      toast.error("Une erreur est survenue lors de la suppression de l'etudiant.");
    },
    retry: false,
  });

  return { deleteUser, isPending };
}
