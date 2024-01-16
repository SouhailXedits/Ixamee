import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-hot-toast';
import { updateAdminToUser as updateAdminToUserApi } from '@/actions/teachers';


  

export function useDeleteAdmin() {
  const queryClient = useQueryClient();
  const { mutate: deleteAdmin, isPending } = useMutation({
    mutationFn: (id: string) => updateAdminToUserApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers-admins'] });
      toast.success('Admin supprimé avec succès.');
    },
    onError: (err) => {
      console.log('ERROR', err);
      toast.error("Une erreur est survenue lors de la suppression de l'admin.");
    },
    retry: false,
  });
  return { deleteAdmin, isPending };
}
