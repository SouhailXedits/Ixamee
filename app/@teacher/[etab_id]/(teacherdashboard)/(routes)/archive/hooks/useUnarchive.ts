import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-hot-toast';
import { unArchive as unArchiveApi } from '@/actions/archive';


interface paramsProps {
  id: number,
  table: string 
}
export function useUnarchive(table: string) {
  const queryClient = useQueryClient();

  const { mutate: unarchiveField, isPending } = useMutation({
    mutationFn: (params: paramsProps) => unArchiveApi(params.id, params.table),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`archived_${table}`] });
      toast.success('Restaurer avec succeé.');
    },
    onError: (err) => {
      console.log('ERROR', err);
      toast.error('Une erreur est survenue lors de la restauration.');
    },
    retry: false,
  });

  return { unarchiveField, isPending };
}
