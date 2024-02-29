'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { useDeleteSubject } from '../hooks/useDeleteSubject';

interface editEstabProps {
  id: number;
  open: boolean;
  setOpen: (value: boolean) => void;
}
export const DeleteSubject = ({ id, open, setOpen }: editEstabProps) => {
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);

  const { deleteSubject, isPending } = useDeleteSubject();

  async function handlDeleteSubject() {
    deleteSubject(id);
    if (!isPending) setIsFirstModalOpen(!isFirstModalOpen);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={!isFirstModalOpen ? 'sm:max-w-[518px]' : 'sm:max-w-[400px]'}>
        <DialogHeader>
          <DialogTitle className="text-[#1B8392] text-xl font-medium ">
            Supprimer cet matière
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-6 placeholder:text-[#727272]">
          <div className="flex flex-col gap-2 p-5">
            <p className="text-[#959595] text-sm">
              Êtes-vous sûr de vouloir supprimer cette matière? <br />
              Cette action ne peut être annulée.
            </p>
          </div>
        </div>

        <DialogFooter className=" mt-3">
          <DialogClose className=" w-full">
            <Button
              type="button"
              disabled={isPending}
              className="w-full bg-transparent border border-[#177C9A] rounded hover:opacity-80 text-[#177C9A]"
            >
              Annuler
            </Button>
          </DialogClose>
          <DialogClose className=" w-full">
            <Button
              onClick={() => handlDeleteSubject()}
              type="submit"
              disabled={isPending}
              className="w-full bg-[#F04438] hover:opacity-80 "
            >
              Supprimer une Matière.
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
