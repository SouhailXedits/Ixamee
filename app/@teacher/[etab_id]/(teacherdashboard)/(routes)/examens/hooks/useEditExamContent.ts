import { updateExamContent as updateExamContentApi } from '@/actions/examens';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';

import { toast } from 'react-hot-toast';

export function useEditExamContent() {
  const Router = useRouter();
  const pathname = usePathname();

  const isExamCorrection = pathname.split('/').length === 4;

  const queryClient = useQueryClient();
  const { mutate: editExam, isPending } = useMutation({
    mutationFn: ({
      exam_id,
      content,
      is_published,
    }: {
      exam_id: string;
      content: any;
      is_published: boolean;
    }) => updateExamContentApi(exam_id, content, is_published), // Call your API function to update the exam
    onSuccess: (exam_id) => {
      // queryClient.invalidateQueries({ queryKey: ['examenById']   });
      queryClient.invalidateQueries({ queryKey: ['dashExamCount'] });
      queryClient.invalidateQueries({ queryKey: ['examens'] });
      queryClient.invalidateQueries({ queryKey: ['examenById'] });

      toast.success('Exame Enregistre avec succès.');
      if (isExamCorrection) Router.back();
      // Router.back();
    },
    onError: (err) => {
      toast.error("Une erreur est survenue lors de l'édition de l'exame.");
    },
    retry: false,
  });

  return { editExam, isPending };
}
