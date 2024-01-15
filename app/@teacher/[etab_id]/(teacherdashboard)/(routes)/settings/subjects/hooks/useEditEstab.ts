import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-hot-toast';
import { editEstablishement as editEstablishementApi } from '@/actions/establishements';


interface paramsProps {
  id: number,
  name: string 
}
export function useEditEstab() {
  const queryClient = useQueryClient();

  const { mutate: editEstablishement, isPending } = useMutation({
    mutationFn: (params:paramsProps) => editEstablishementApi(params.id, params.name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['estabs'] });
      toast.success('Établissement édité avec succès.');
    },
    onError: (err) => {
      console.log('ERROR', err);
      toast.error("Une erreur est survenue lors de l'édition de l'établissement.");
    },
    retry: false,
  });

  return { editEstablishement, isPending };
}
