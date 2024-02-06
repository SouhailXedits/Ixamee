import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-hot-toast';
import { archive as archiveApi } from '@/actions/archive';

interface paramsProps {
  id: number;
  table: string;
}
export function useArchive(table: string) {
  const queryClient = useQueryClient();

  const { mutate: archiveField, isPending } = useMutation({
    mutationFn: (params: paramsProps) => archiveApi(params.id, params.table),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`archived_${table}`] });
      queryClient.invalidateQueries({ queryKey: [`examens`] });
      queryClient.invalidateQueries({ queryKey: [`dashArchiveCount`] });
      toast.success('archivé avec succeé.');
    },
    onError: (err) => {

      toast.error("Une erreur est survenue lors de l'archivation.");
    },
    retry: false,
  });

  return { archiveField, isPending };
}
