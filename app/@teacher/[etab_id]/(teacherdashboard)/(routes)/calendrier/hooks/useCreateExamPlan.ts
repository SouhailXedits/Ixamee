'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createExamPlan as createExamPlanApi } from '@/actions/exam-plans';
import { useParams, usePathname, useRouter } from 'next/navigation';

export function useCreateExamPlan() {
  const queryClient = useQueryClient();
  const params = useParams();
  const pathName = usePathname();
  const router = useRouter();
  const { mutate: createExamPlan, isPending } = useMutation<any, any, any>({
    mutationFn: (data: { data: any }) => createExamPlanApi(data),
    onSuccess: (data: any) => {
      const queryKeys = ['events', 'dashExamCount'];
      queryClient.invalidateQueries(queryKeys);
      toast.success('Exam planification ajouté avec succès.');
      const examId = data.id;
      const etabId = params.etab_id;
      const path = pathName.includes('/examens') ? pathName : `${etabId}/examens`;
      router.push(`${path}/${examId}`);
    },
    onError: (err: any) => {
      console.error(err);
      toast.error('There was an error creating the Exam');
    },
    retry: false,
  });

  return { createExam
