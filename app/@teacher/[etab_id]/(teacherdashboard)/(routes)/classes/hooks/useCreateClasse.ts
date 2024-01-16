import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'react-hot-toast';
import { createClasse as createClasseApi } from '@/actions/classe';

interface CreateClasseParams {
  name: string;
  matiere: string; // Update with the actual type for class data
  establishmentId: string;
  teacherId: string;
}

export function useCreateClasse() {
  const queryClient = useQueryClient();
  const { mutate: createClass, isPending } = useMutation({
    mutationFn: ({ name, matiere, establishmentId, teacherId }: CreateClasseParams) =>
      createClasseApi(name, matiere, establishmentId, teacherId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classe'] });
      toast.success('Class added successfully.');
    },
    onError: (err) => {
      console.error('Error creating class:', err);
      toast.error('There was an error creating the class');
    },
    retry: false,
  });

  return { createClass, isPending };
}
