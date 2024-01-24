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
  console.log(user.email);

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
          <Button type="submit" className="w-full text-white bg-[#177C9A] hover:opacity-80">
            Inviter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
