import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { CreateClasseParams, CreateClasseResult } from '@/actions/classe';

export function useCreateManyUserInClass() {
  const queryClient = useQueryClient();
  const {
    mutate: createManyUser,
    isPending,
    error,
  } = useMutation<CreateClasseResult, Error, CreateClasseParams>(
    (data) => createUserWithImportInClasseAPi(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['userOfClasses'] });
        toast.success('Étudiants ajoutés avec succès.');
      },
      onError: (err, variables, context) => {
        if (isPending()) {
          toast.error("Une erreur s'est produite lors de la création de l'étudiant");
        }
      },
      retry: false,
    }
  );

  const memoizedCreateManyUser = useCallback(createManyUser, [queryClient]);

  useEffect(() => {
    return () => {
      toast.dismiss();
    };
  }, []);

  return { memoizedCreateManyUser, isPending, error };
}
