import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'react-hot-toast';
import { updateInvitationUser as updateInvitationUserApi } from '@/actions/classe';

export function useInviteUserInClasse() {
  const queryClient = useQueryClient();
  const { mutate: updateInvitationUser, isPending } = useMutation({
    mutationFn: ({ studentEmail, teacherEmail }: { studentEmail: string; teacherEmail: string }) =>
      updateInvitationUserApi(studentEmail, teacherEmail),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userOfClasses'] });
      toast.success('invitation envoyée avec succès.');
    },
    onError: (err) => {
      console.log('ERROR', err);
      toast.error("Une erreur est survenue lors de l'invitation de l'etudiant.");
    },
    retry: false,
  });
  return { updateInvitationUser, isPending };
}
