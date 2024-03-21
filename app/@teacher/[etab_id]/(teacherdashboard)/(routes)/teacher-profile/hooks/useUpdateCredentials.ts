import { UseMutationResult, UseQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateTeacherCredentials } from '@/actions/profile/updateUserCredentials';

export interface UpdateCredentialsProps {
  onSuccess: () => void;
  onError: () => void;
}

export function useUpdateCredentials(queryClient: UseQueryClient) {
  const { mutate: updateUser, isPending } = useMutation<
    any,
    Error,
    any,
    UpdateCredentialsProps
  >(
    (values: any) => updateTeacherCredentials(values),
    {
      onSuccess: ({ success }) => {
        if (success) {
          queryClient.invalidateQueries({ queryKey: ['user'] });
          queryClient.invalidateQueries({ queryKey: ['teacherSubjects'] });
          queryClient.invalidateQueries({ queryKey: ['AllEstabOfUser'] });
          toast.success(success);
        }
      },
      onError: () => {
        toast.error('Une erreur est survenue, réessayez une autre fois');
      },
      retry: false,
    }
  );

  return { updateUser, isPending };
}
