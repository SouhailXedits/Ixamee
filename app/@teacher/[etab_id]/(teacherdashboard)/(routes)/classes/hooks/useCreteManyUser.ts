import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'react-hot-toast';
import { createUserWithImportInClasse as createUserWithImportInClasseAPi } from '@/actions/classe';

interface CreateClasseParams {
  image: string;
  name: string;
  establishmentId: number;
  range: number;
  email: string;
  class_id: string;
}

export function createManyUserInClass() {
  const queryClient = useQueryClient();
  const {
    mutate: createManyUser,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ image, name, range, email, class_id, establishmentId }: CreateClasseParams) =>
      createUserWithImportInClasseAPi(image, name, range, email, +class_id, establishmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userOfClasses'] });
      toast.success('Students added successfully.');
    },
    onError: (err) => {
      console.error('Error creating Student:', err);
      toast.error("Une erreur s'est produite lors de la création de l'étudiant");
    },
    retry: false,
  });

  return { createManyUser, isPending, error };
}
