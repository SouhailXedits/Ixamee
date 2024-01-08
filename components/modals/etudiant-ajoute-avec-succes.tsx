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
import Image from 'next/image';

interface EtudiantAjouteAvecSucces {
  children: React.ReactNode;
}
export const EtudiantAjouteAvecSucces = ({ children }: EtudiantAjouteAvecSucces) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-[#1B8392] text-xl font-medium ">
            Ajouter un étudiant
          </DialogTitle>
        </DialogHeader>

        <div>
          <Image
            src={'/etudiantajouteravecsucces.svg'}
            alt="etudiantajouteravecsucces"
            width={300}
            height={300}
          />
        </div>

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
