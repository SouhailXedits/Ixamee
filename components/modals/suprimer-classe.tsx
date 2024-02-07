import { useDeleteClasse } from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/classes/hooks/useDeleteClasse';
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
  children: React.ReactNode;
  classe_id: string;
}
export const SupprimerUneClasse = ({ children, classe_id }: SupprimerUneClasse) => {
  const { deleteClasse } = useDeleteClasse();
  const handelDeleteExa = () => {
    deleteClasse(+classe_id);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-[#1B8392] text-xl font-medium ">
            Supprimer votre classe
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className=" text-neutral-400 text-[15px] font-normal ">
          Êtes-vous sûr de vouloir supprimer cette classe? Cette action ne peut être annulée.
        </DialogDescription>

        <DialogFooter className="w-full ">
          <DialogClose asChild className="w-full">
            <Button
              type="submit"
              className=" bg-white w-full
          text-[#177C9A] border border-[#177C9A] hover:opacity-80"
            >
              Annuler
            </Button>
          </DialogClose>
          <DialogClose className="w-full">
            <Button
              className=" w-full text-white bg-[#F04438] hover:opacity-80"
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
