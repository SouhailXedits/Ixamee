import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-hot-toast';
import { updateStudentPrespectation as updateStudentPrespectationApi } from '@/actions/exam-correction';

interface paramsProps {
  correction_id: number;
  user_id: string;
  prespectation: any;
}
export function useUpdateExamPresp() {
  const queryClient = useQueryClient();

  const { mutate: updateStudentPrespectation, isPending } = useMutation({
    mutationFn: (params: paramsProps) =>
      updateStudentPrespectationApi(params.correction_id, params.user_id , params.prespectation),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['CorigeExameContent'] });
      toast.success('Auto correction creé avec succès.');
    },
    onError: (err) => {
      toast.error(err.message);
    //   toast.error('Une erreur est survenue lors de la creation de la auto correction' );
    },
    retry: false,
  });

  return { updateStudentPrespectation, isPending };
}
