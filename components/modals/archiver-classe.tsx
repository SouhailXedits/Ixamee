'use client';
import { useArchive } from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/archive/hooks/useArchive';
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
  open: boolean;
  setOpen: (open: boolean) => void;

  classe_id: string;
}
export const ArchiveUneClasse = ({ classe_id, open, setOpen }: ArchiveUneClasse) => {
  const { archiveField, isPending } = useArchive('classe');

  const handleArchive = (classe_id: string) => {
    const table = 'classe';
    const id = +classe_id;

    archiveField({ id, table });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-[#1B8392] text-xl font-medium ">
            Archiver cette classe
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className=" text-neutral-400 text-[15px] font-normal ">
          Êtes-vous sûr de vouloir archiver cette classe? Vous pouvez toujours le désarchiver.
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
              onClick={() => handleArchive(classe_id)}
              className="w-full text-white bg-[#177C9A] hover:opacity-80"
            >
              Archiver
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
