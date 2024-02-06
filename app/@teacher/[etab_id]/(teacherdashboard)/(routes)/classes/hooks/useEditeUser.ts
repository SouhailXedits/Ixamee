import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'react-hot-toast';
import { updateUserInClasse as updateUserInClasseApi } from '@/actions/classe';

export function useUpdateUserInClasse() {
  const queryClient = useQueryClient();
  const { mutate: updateUserInClasse, isPending } = useMutation({
    mutationFn: ({ id, name, email, image }: any) => updateUserInClasseApi(id, name, email, image),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userOfClasses'] });
      toast.success('etudiant modifié avec succès.');
    },
    onError: (err) => {
      toast.error("Une erreur est survenue lors de l'édition de l'etudiant.");
    },
    retry: false,
  });
  return { updateUserInClasse, isPending };
}
