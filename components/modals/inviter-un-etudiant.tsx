import { useInviteUserInClasse } from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/classes/hooks/useEditeInvitationState';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useQueryClient } from '@tanstack/react-query';

interface ArchiveUneClasse {
  children: React.ReactNode;
  studentEmail: string;
}
export const InviterUnEtudiant = ({ children, studentEmail }: ArchiveUneClasse) => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<any>(['user']);
  const teacherEmail = user?.email;
  const { updateInvitationUser, isPending } = useInviteUserInClasse();

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-[#1B8392] text-xl font-medium ">
            Inviter cet étudiant
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className=" text-neutral-400 text-[15px] font-normal ">
          Cet élève n&apos;a pas d&apos;adresse e-mail. Ajoutez son e-mail pour pouvoir
          l&apos;inviter.
        </DialogDescription>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="submit"
              className="w-full bg-white
          text-[#177C9A] border border-[#177C9A] hover:opacity-80"
            >
              Annuler
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="submit"
              className="w-full text-white bg-[#177C9A] hover:opacity-80"
              onClick={() => updateInvitationUser({studentEmail, teacherEmail})}
            >
              Inviter
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
