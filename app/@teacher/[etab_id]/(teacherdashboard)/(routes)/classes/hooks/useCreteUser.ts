import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'react-hot-toast';
import { createUserInClasse as createUserInClasseApi } from '@/actions/classe';

interface CreateClasseParams {
  image: string;
  name: string;
  establishmentId: number;
  range: number;
  email: string;
  class_id: string;
}

export function useCreateUserInClasse() {
  const queryClient = useQueryClient();
  const {
    mutate: createUserInClass,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ image, name, range, email, class_id, establishmentId }: CreateClasseParams) =>
      createUserInClasseApi(image, name, range, email, class_id, establishmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userOfClasses'] });
      toast.success('Student added successfully.');
    },
    onError: (err) => {
      console.error('Error creating Student:', err);
      toast.error("Une erreur s'est produite lors de la création de l'étudiant");
    },
    retry: false,
  });

  return { createUserInClass, isPending, error };
}