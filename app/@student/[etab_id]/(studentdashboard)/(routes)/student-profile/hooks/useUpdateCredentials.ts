import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'react-hot-toast';
import { updateTeacherCredentials } from '@/actions/profile/updateUserCredentials';

export function useUpdateCredentials() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: (values: any) => updateTeacherCredentials(values),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['teachersubjects'] });
      queryClient.invalidateQueries({ queryKey: ['AllEstabOfUser'] });
      if (data?.success) {
        toast.success(data.success + '');
      }
      if (data?.error) {
        toast.error(data.error)
      }
    },
    onError: (err) => {
      console.log('ERROR', err);
      toast.error('Une erreur est survenue ressayer une autre fois');
    },
    retry: false,
  });
  return { updateUser, isPending };
}
