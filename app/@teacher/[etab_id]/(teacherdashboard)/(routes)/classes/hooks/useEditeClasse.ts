import { UseMutationResult, UseQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateClasse as updateClasseApi } from '@/actions/classe';

type EditClasseParams = {
  name: string;
  classe_id: number;
  matiere: string; // Update with the actual type for class data
};

export function useEditClasse(
  queryClient: UseQueryClient
): UseMutationResult<void, Error, EditClasseParams> {
  return useMutation(
    ({ name, classe_id, matiere }: EditClasseParams) =>
      updateClasseApi(name, classe_id, matiere),
    {
      onSuccess: () => {
        const queriesToInvalidate = [
          'classe',
          'dashClasses',
          'dashClasseCount',
          'dashStudentClasses',
        ];

        queriesToInvalidate.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey });
        });

        toast.success('Classe modifiée avec succès.');
      },
      onError: (err) => {
        console.error('Error edite class:', err);
        toast.error('Erreur lors de la modification de la classe.');
      },
      retry: false,
    }
  );
}
