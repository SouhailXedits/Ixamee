import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-hot-toast';
import { editEstablishement as editEstablishementApi } from '@/actions/establishements';
import { editSubject as editSubjectApi } from '@/actions/subjects';
import { SubjectInputProps } from '@/types/subjects/subjectTypes';

interface paramsProps {
  id: number;
  data: SubjectInputProps;
}
export function useEditSubject() {
  const queryClient = useQueryClient();

  const { mutate: editSubject, isPending } = useMutation({
    mutationFn: (params: paramsProps) => editSubjectApi(params.id, params.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subjects'] });
      toast.success('Matière modifié avec succès.');
    },
    onError: (err) => {
      toast.error("Une erreur est survenue lors de l'édition de la matière.");
    },
    retry: false,
  });

  return { editSubject, isPending };
}
