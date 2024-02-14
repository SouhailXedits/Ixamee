import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'react-hot-toast';
import { createUserWithImportInClasse as createUserWithImportInClasseAPi } from '@/actions/classe';

interface CreateClasseParams {
  data: any;
}

export function useCreateManyUserInClass() {
  const queryClient = useQueryClient();
  const {
    mutate: createManyUser,
    isPending,
    error,
  } = useMutation({
    mutationFn: (data: CreateClasseParams) => createUserWithImportInClasseAPi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userOfClasses'] });
      toast.success('Étudiantsw ajoutés avec succès.');
    },
    onError: (err) => {
      toast.error("Une erreur s'est produite lors de la création de l'étudiant");
    },
    retry: false,
  });

  return { createManyUser, isPending, error };
}
