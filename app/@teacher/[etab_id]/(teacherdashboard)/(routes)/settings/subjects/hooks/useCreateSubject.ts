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
    },
    onError: (err) => {
      console.log('ERROR', err);
      toast.error('There was an error creating the esatblishement');
    },
    retry: false,
  });

  return { createSubject, isPending };
}
