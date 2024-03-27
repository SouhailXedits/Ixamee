import { useDeleteUserInClasse } from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/classes/hooks/useDeleteUser';
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

interface SupprimerUneClasse {
  user_id: string;
  classe_id: string;
  open: boolean;
  exam_id: string;
  setOpen: (open: boolean) => void;
}
export const SupprimerUserInClasse = ({
  user_id,
  classe_id,
  open,
  exam_id,

  setOpen,
}: SupprimerUneClasse) => {
  const { deleteUser } = useDeleteUserInClasse();
  const handelDeleteExa = () => {
    deleteUser({ user_id, classe_id, exam_id });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-[#1B8392] text-xl font-medium ">
            Supprimer cet étudiant
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className=" text-neutral-400 text-[15px] font-normal ">
          Êtes-vous sûr de vouloir supprimer cet étudiant? Cette action ne peut être annulée.
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
              className="w-full text-white bg-[#F04438] hover:opacity-80"
              onClick={handelDeleteExa}
            >
              Supprimer
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
