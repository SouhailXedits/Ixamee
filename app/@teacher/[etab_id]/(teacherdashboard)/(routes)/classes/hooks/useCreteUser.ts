import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'react-hot-toast';
import { createUserInClasse as createUserInClasseApi } from '@/actions/classe';

interface CreateClasseParams {
  image: string;
  name: string;
  establishmentId: number;
  email: string;
  term:string
  class_id: string;
}

export function useCreateUserInClasse() {
  const queryClient = useQueryClient();
  const {
    mutate: createUserInClass,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ image, name, email,term, class_id, establishmentId }: CreateClasseParams) =>
      createUserInClasseApi(image, name, email,term, class_id, establishmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userOfClasses'] });
      queryClient.invalidateQueries({ queryKey: ['dashStudentClasses'] });
      toast.success('Étudiant ajouté avec succès.');
    },
    onError: (err) => {
      // console.error("Erreur lors de la création de l'étudiant.", err);
      toast.error("Une erreur s'est produite lors de la création de l'étudiant");
    },
    retry: false,
  });

  return { createUserInClass, isPending, error };
}
