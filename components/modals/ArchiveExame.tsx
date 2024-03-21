'use client';
import { useArchive } from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/archive/hooks/useArchive';
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
import { Button } from '@/components/ui/button';

interface ArchiveExameProps {
  children: React.ReactNode;
  id: number;
}

export const ArchiveExame = ({ children, id }: ArchiveExameProps) => {
  const { archiveField, isPending } = useArchive('exams');

  const handleArchive = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    archiveField({ id, table: 'exam' });
  };

  return (
    <Dialog id={`dialog-${id}`}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-[#1B8392] text-xl font-medium ">
            Archiver cette Exame
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className=" text-neutral-400 text-[15px] font-normal ">
          Êtes-vous sûr de vouloir archiver cette Exame? Vous pouvez toujours le désarchiver.
        </DialogDescription>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              className="w-full bg-white text-[#177C9A] border border-[#177C9A] hover:opacity-80"
            >
              Annuler
            </Button>
          </DialogClose>
          <Button
            name="bnt"
            className="w-full text-white bg-[#177C9A] hover:opacity-80"
            disabled={isPending}
            loading={isPending}
            type="submit"
            onClick={handleArchive}
          >
            Archiver
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
