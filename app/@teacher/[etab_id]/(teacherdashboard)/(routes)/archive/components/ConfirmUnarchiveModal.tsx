'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { useUnarchive } from '../hooks/useUnarchive';

interface editEstabProps {
  id: number;
  children: React.ReactNode;
  isExam: boolean;
}
export const ConfirmUnarchiveModel = ({ id, children, isExam }: editEstabProps) => {
  const { unarchiveField: unArchiveExam, isPending } = useUnarchive('exams');
  const { unarchiveField: unArchiveClasse, isPending: isUnarchiveingClass } =
    useUnarchive('classes');
  function handleClick() {

    if (isExam) {

      const table = 'exam';
      unArchiveExam({ id, table });
    } else {
      const table = 'classe';
      unArchiveClasse({ id, table });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={'sm:max-w-[400px]'}>
        <DialogHeader>
          <DialogTitle className="text-[#1B8392] text-xl font-medium ">Restaurer</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-6 placeholder:text-[#727272]">
          <div className="flex flex-col gap-2 p-5">
            <p className="text-[#959595] text-sm">
              Êtes-vous sûr de vouloir restaurer ces donnée? Cette action ne peut être annulée.
            </p>
            {/* <Label className="text-[#959595]">
              Nom : <span className="text-red">*</span>
            </Label>
            <Input
              type="text"
              defaultValue={currentName}
              onChange={(e) => setName(e.target.value)}
              placeholder="Entrer le nom de l'établissement"
              className="placeholder:text-[#727272]"
            /> */}
          </div>
        </div>

        <DialogFooter>
          <DialogClose className="w-full ">
            <Button
              type="button"
              disabled={isPending}
              className="w-full bg-transparent border border-[#177C9A] rounded hover:opacity-80 text-[#177C9A]"
            >
              Annuler
            </Button>
          </DialogClose>
          <DialogClose className=' w-full'>
            <Button
              onClick={() => handleClick()}
              type="submit"
              disabled={isPending}
              className="w-full bg-2 hover:opacity-80 "
            >
              Restaurer.
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
