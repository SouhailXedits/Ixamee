import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'react-hot-toast';
import { createUserInClasse as createUserInClasseApi } from '@/actions/classe';

interface CreateClasseParams {
  image: string;
  name: string;
  establishmentId: number;
  email: string;
  term: string;
  class_id: string;
}

export function useCreateUserInClasse() {
  const queryClient = useQueryClient();
  const {
    mutate: createUserInClass,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ image, name, email, term, class_id, establishmentId }: CreateClasseParams) =>
      createUserInClasseApi(image, name, email, term, class_id, establishmentId),
    onSuccess: (data: any) => {
      if(data.error && data.error.status === 'already_teacher') toast.error(data.error.message);
      else if (data.error && data.error.status === 'exist_in_classe') toast.error(data.error.message);
      else {
        queryClient.invalidateQueries({ queryKey: ['userOfClasses'] });
        queryClient.invalidateQueries({ queryKey: ['dashStudentClasses'] });
        toast.success('Étudiant ajouté avec succès.');
      }
    },
    onError: (err: any) => {
      console.log(err)
      const message = err.message
      if (message.includes('Unique constraint failed'))
        toast.error('Un étudiant avec cet email déja existe');
      else if (message.includes('enseignant')) toast.error(message);
      else toast.error("Une erreur s'est produite lors de la création de l'étudiant");

      //   ror {
      // digest: '1270835298',
      // stack: 'PrismaClientKnownRequestError: \n' +
      //   'Invalid `prisma.user.create()` invocation:\n' +
      //   '\n' +
      //   '\n' +
      //   'Unique constraint failed on the fields: (`email`)\n' +
      // toast.error("Une erreur s'est produite lors de la création de l'étudiant");
    },
    retry: false,
  });

  return { createUserInClass, isPending, error };
}
