import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-hot-toast';
import { deleteEstablishement as deleteEstablishementApi } from '@/actions/establishements';

export function useDeleteEstab() {
  const queryClient = useQueryClient();

  const { mutate: deleteEstablishement, isPending } = useMutation({
    mutationFn: (id: number) => deleteEstablishementApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['estabs'] });
      toast.success('Établissement supprimé avec succès.');
    },
    onError: (err) => {
      console.log('ERROR', err);
      toast.error("Une erreur est survenue lors de la suppression de l'établissement.");
    },
    retry: false,
  });

  return { deleteEstablishement, isPending };
}
