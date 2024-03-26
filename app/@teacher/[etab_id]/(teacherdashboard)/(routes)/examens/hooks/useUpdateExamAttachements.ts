import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'react-hot-toast';
import { updateExamAttachements as updateExamAttachementsApi } from '@/actions/examens';

export function useUpdateExamAttachements() {
  const queryClient = useQueryClient();

  const { mutate: updateExamAttachements, isPending } = useMutation({
    mutationFn: ({ exam_id, attachements }: { exam_id: number; attachements: any }) =>
      updateExamAttachementsApi({exam_id, attachements}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashExamCount'] });
      queryClient.invalidateQueries({ queryKey: ['examens'] });
      toast.success('Attachements modifié avec succès.');
    },
    onError: (err) => {
      toast.error("Une erreur est survenue lors de la modification de l'attachements.");
    },
    retry: false,
  });

  return { updateExamAttachements, isPending };
}
