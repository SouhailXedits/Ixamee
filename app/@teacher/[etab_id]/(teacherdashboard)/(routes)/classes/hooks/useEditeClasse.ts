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
      queryClient.invalidateQueries({ queryKey: ['dashClasses'] });
      queryClient.invalidateQueries({ queryKey: ['dashClasseCount'] });
      queryClient.invalidateQueries({ queryKey: ['dashStudentClasses'] });
      toast.success('Classe modifiée avec succès.');
    },
    onError: (err) => {
      console.error('Error edite class:', err);
      toast.error('Erreur lors de la modification de la classe.');
    },
    retry: false,
  });

  return { editeClass, isPending };
}
