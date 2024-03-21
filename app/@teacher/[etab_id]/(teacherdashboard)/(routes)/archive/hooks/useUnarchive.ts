import { UseMutationResult, UseQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-hot-toast';
import { unArchive as unArchiveApi } from '@/actions/archive';

interface UnarchiveParams {
  id: number;
  table: string;
}

export function useUnarchive(table: string): UseMutationResult<void, unknown, UnarchiveParams, unknown> {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ id, table }: UnarchiveParams) => unArchiveApi(id, table),
    onSuccess: () => {
      const archivedQueryKey = [`archived_${table}`];
      const dashArchiveCountQueryKey = [`dashArchiveCount`];

      queryClient.invalidateQueries(archivedQueryKey);
      queryClient.invalidateQueries(dashArchiveCountQueryKey);

      toast.success('Restaurer avec succès.');
    },
    onError: (error: unknown) => {
      toast.error('Une erreur est survenue lors de la restauration.');
    },
    retry: false,
  });
}
