import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-hot-toast';
import { updateExamPlan as updateExamPlanApi } from '@/actions/exam-plans';

interface paramsProps {
  id?: number;
  title?: string;
  color?: any;
  subject?: any;
  classes?: any;
  start?: Date;
  end?: Date;
  description?: string;
  studentsVisibility?: boolean;
  estab?: number;
  user_id?: string;
}
export function useUpdateExamPlan() {
  const queryClient = useQueryClient();

  const { mutate: updateExamPlan, isPending } = useMutation({
    mutationFn: (data: paramsProps) => updateExamPlanApi(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success('Examen planification modifieé avec succès.');
    },
    onError: (err) => {
      toast.error("Une erreur est survenue lors de la modification de l'examen planification");
    },
    retry: false,
  });

  return { updateExamPlan, isPending };
}
