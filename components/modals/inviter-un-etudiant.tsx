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

interface ArchiveUneClasse {
  children: React.ReactNode;
}
export const InviterUnEtudiant = ({ children }: ArchiveUneClasse) => {
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
          Cet élève n'a pas d'adresse e-mail. Ajoutez son e-mail pour pouvoir l'inviter.
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
            Archiver
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
