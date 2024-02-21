'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'react-hot-toast';
import { createExamPlan as createExamPlanApi } from '@/actions/exam-plans';
import { useParams, usePathname, useRouter } from 'next/navigation';

export function useCreateExamPlan() {
//   const queryClient = useQueryClient();
//   const params = useParams();
//   const pathName = usePathname();
//   const router = useRouter();
  const { mutate: creatExamPlan, isPending } = useMutation({
    mutationFn: ( data : { data: any;}) =>
      createExamPlanApi(data),
    onSuccess: (data: any) => {
    //   queryClient.invalidateQueries({ queryKey: ['examens'] });
    //   queryClient.invalidateQueries({ queryKey: ['dashExamCount'] });
      toast.success('Exam planification ajouté avec succès.');
    //   if (pathName.includes('/examens')) {
    //     router.push(pathName + '/' + data.id);
    //   } else {
    //     router.push(params.etab_id + '/examens/' + data.id);
    //   }
    },
    onError: (err) => {
        console.log(err)
      toast.error('There was an error creating the Exam');
    },
    retry: false,
  });

  return { creatExamPlan, isPending };
}
