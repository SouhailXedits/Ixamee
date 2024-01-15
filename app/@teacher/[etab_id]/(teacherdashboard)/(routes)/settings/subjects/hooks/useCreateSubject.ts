import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { SubjectInputProps } from '@/types/subjects/subjectTypes';
import { createSubject as createSubjectApi } from '@/actions/subjects';

export function useCreateSubject() {
  const queryClient = useQueryClient();
  const { mutate: createSubject, isPending } = useMutation({
    mutationFn: (data: SubjectInputProps) => createSubjectApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subjects'] });
      toast.success('Matière creé avec succès.');
    },
    onError: (err) => {
      console.log('ERROR', err);
      toast.error("Une erreur est survenue lors de la création de la matière.");
    },
    retry: false,
  });

  return { createSubject, isPending };
}
