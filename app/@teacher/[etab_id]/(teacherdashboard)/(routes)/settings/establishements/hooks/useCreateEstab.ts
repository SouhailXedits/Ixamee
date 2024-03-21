import { UseMutationResult, UseQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { CreateEstablishmentData } from '@/types/establishment';
import { createEstablishment as createEstablishmentApi } from '@/actions/establishments';

export function useCreateEstablishment(): UseMutationResult<void, Error, CreateEstablishmentData> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (name: string) => createEstablishmentApi(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['establishments'] });
      toast.success('Établissement créé avec succès !');
    },
    onError: (error) => {
      toast.error('Une erreur est survenue lors de la création de l\'établissement');
      console.error(error);
    },
    retry: false,
  });
}
