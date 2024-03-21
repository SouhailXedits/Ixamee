import { UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { deleteEstablishment as deleteEstablishmentApi } from '@/actions/establishments';

export function useDeleteEstablishment(): UseMutationResult<void, Error, number, unknown> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteEstablishmentApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['establishments'] });
      toast.success('Établissement supprimé avec succès.');
    },
    onError: (error: Error) => {
      toast.error(`Une erreur est survenue lors de la suppression de l'établissement: ${error.message}`);
    },
    retry: false,
  });
}
