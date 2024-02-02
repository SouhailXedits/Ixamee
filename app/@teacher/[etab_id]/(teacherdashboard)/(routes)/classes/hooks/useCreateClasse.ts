import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'react-hot-toast';
import { createClasse as createClasseApi } from '@/actions/classe';

interface CreateClasseParams {
  name: string;
  matiere: string; // Update with the actual type for class data
  establishmentId: number;
  teacherId: string;
}

export function useCreateClasse() {
  const queryClient = useQueryClient();
  const { mutate: createClass, isPending } = useMutation({
    mutationFn: ({ name, matiere, establishmentId, teacherId }: CreateClasseParams) =>
      createClasseApi(name, matiere, establishmentId, teacherId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classe'] });
      queryClient.invalidateQueries({ queryKey: ['dashClasses'] });
      queryClient.invalidateQueries({ queryKey: ['dashClasseCount'] });
      queryClient.invalidateQueries({ queryKey: ['dashStudentClasses'] });
      toast.success('Classe ajoutée avec succès.');
    },
    onError: (err) => {
      console.error('Erreur lors de la création de la classe.:', err);
      toast.error('Il y a eu une erreur lors de la création de la classe.');
    },
    retry: false,
  });

  return { createClass, isPending };
}
