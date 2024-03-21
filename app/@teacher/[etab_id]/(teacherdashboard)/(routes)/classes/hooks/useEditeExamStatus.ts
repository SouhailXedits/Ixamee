import { UseMutationResult, UseQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { editExamStatus as editExamStatusApi } from '@/actions/examens';

type CreateExamCorrectionParams = {
  exam_id: string;
  user_id: string;
  status: 'notClassified' | 'absent';
};

type UseEditeExamStatusResult = {
  editeStatus: (params: CreateExamCorrectionParams) => Promise<void>;
  isPending: boolean;
};

export function useEditeExamStatus(
  queryClient: UseQueryClient
): UseEditeExamStatusResult {
  const { mutate: editeStatus, isPending } = useMutation<void, Error, CreateExamCorrectionParams>({
    mutationFn: ({ exam_id, user_id, status }) => editExamStatusApi({ exam_id, user_id, status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userCorrection'] });
      toast.success('Correction de l\'examen ajoutée avec succès.');
    },
    onError: (err) => {
      toast.error('Il y a eu une erreur lors de la création de la correction de l\'examen.');
      console.error(err);
    },
    retry: false,
  });

  return { editeStatus, isPending };
}
