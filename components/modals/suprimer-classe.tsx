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
}
export const SupprimerUneClasse = ({ children }: SupprimerUneClasse) => {
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
          <Button type="submit" className="w-full text-white bg-[#F04438] hover:opacity-80">
            Supprimer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
