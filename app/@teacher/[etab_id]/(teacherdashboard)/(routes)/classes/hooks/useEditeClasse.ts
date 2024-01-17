import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'react-hot-toast';
import { updateClasse as updateClasseApi } from '@/actions/classe';

interface editeClasseParams {
  name: string;
  classe_id: number;
  matiere: string; // Update with the actual type for class data
}

export function useEditeClasse() {
  const queryClient = useQueryClient();
  const { mutate: editeClass, isPending } = useMutation({
    mutationFn: ({ name, classe_id, matiere }: editeClasseParams) =>
      updateClasseApi(name, classe_id, matiere),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classe'] });
      toast.success('Class Edite successfully.');
    },
    onError: (err) => {
      console.error('Error edite class:', err);
      toast.error('Error edite class');
    },
    retry: false,
  });

  return { editeClass, isPending };
}
