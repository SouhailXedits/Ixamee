import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-hot-toast';
import { updateUserToAdmin as updateUserToAdminApi } from '@/actions/teachers';


  

export function useEditUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUserToAdmin, isPending } = useMutation({
    mutationFn: (id: string) => updateUserToAdminApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers-admins'] });
      toast.success('Établissement édité avec succès.');
    },
    onError: (err) => {
      console.log('ERROR', err);
      toast.error("Une erreur est survenue lors de l'édition de l'établissement.");
    },
    retry: false,
  });
  return {updateUserToAdmin, isPending };
}
