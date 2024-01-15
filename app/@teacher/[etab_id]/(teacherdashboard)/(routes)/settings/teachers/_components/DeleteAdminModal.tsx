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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';
import { useState } from 'react';
import { useCreateEstab } from '../hooks/useCreateEstab';
import { useEditEstab } from '../hooks/useEditEstab';
import { useDeleteEstab } from '../hooks/useDeleteEstab copy';
import { useDeleteAdmin } from '../hooks/useDeleteAdmin';

interface EditUserFormProps {
  id: string;
  children: React.ReactNode;
}
export const DeleteAdminModal = ({ id, children }: EditUserFormProps) => {
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);

  const { deleteAdmin, isPending } = useDeleteAdmin();

  async function handlDeleteEstab() {
    deleteAdmin(id);
    if (!isPending) setIsFirstModalOpen(!isFirstModalOpen);
  }

  function returnToCreate() {
    setIsFirstModalOpen(!isFirstModalOpen);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={!isFirstModalOpen ? 'sm:max-w-[518px]' : 'sm:max-w-[400px]'}>
        <DialogHeader>
          <DialogTitle className="text-[#1B8392] text-xl font-medium ">
            Supprimer cet admin
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-6 placeholder:text-[#727272]">
          <div className="flex flex-col gap-2 p-5">
            <p className="text-[#959595] text-sm">
              Êtes-vous sûr de vouloir supprimer cet admin? Cette action ne peut être
              annulée.
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
          <DialogClose className=" w-full">
            <Button
              type="button"
              disabled={isPending}
              className="w-full bg-transparent border border-[#177C9A] rounded hover:opacity-80 text-[#177C9A]"
            >
              Annuler
            </Button>
          </DialogClose>
          <DialogClose>
            <Button
              onClick={() => handlDeleteEstab()}
              type="submit"
              disabled={isPending}
              className="w-full bg-[#F04438] hover:opacity-80 "
            >
              Supprimer une établissement.
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};


