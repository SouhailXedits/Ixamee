import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-hot-toast';
import { createEstablishement as createEstablishementApi } from '@/actions/establishements';

export function useCreateEstab() {
  const queryClient = useQueryClient();

  const { mutate: createEstablishement, isPending } = useMutation({
    mutationFn: (name: string) => createEstablishementApi(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['estabs'] });
    },
    onError: (err) => {
      console.log('ERROR', err);
      toast.error('There was an error creating the esatblishement');
    },
    retry: false,
  });

  return { createEstablishement, isPending };
}
