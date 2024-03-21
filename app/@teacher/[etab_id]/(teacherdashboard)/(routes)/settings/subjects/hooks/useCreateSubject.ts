import { UseMutationResult, UseQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { SubjectInputProps } from '@/types/subjects/subjectTypes';
import { createSubject as createSubjectApi } from '@/actions/subjects';

export function useCreateSubject(queryClient: UseQueryClient) {
  const { mutate: createSubject, isPending } = useMutation<void, Error, SubjectInputProps>({
    mutationFn: (data: SubjectInputProps) => createSubjectApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subjects'] });
      toast.success('Matière créée avec succès.');
    },
    onError: (err) => {
      toast.error('Une erreur est survenue lors de la création de la matière : ' + err.message);
    },
    retry: false,
  });

  return { createSubject, isPending };
}
