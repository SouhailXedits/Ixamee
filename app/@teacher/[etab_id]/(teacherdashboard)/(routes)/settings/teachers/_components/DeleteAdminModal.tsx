'use client';
import { Button, Label, Input, Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from '@radix-ui/react-dialog';
import { Check, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useDeleteAdmin } from '../hooks/useDeleteAdmin';

interface EditUserFormProps {
  id: string;
  children: React.ReactNode;
}

export const DeleteAdminModal = ({ id, children }: EditUserFormProps) => {
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { deleteAdmin, isPending, mutate } = useDeleteAdmin();

  async function handleDeleteEstab() {
    setError(null);
    setIsDeleteConfirmed(true);
    try {
      await deleteAdmin(id);
      mutate();
      setIsFirstModalOpen(false);
    } catch (err) {
      setError('An error occurred while deleting the admin.');
    }
  }

  function handleCloseModal() {
    setIsFirstModalOpen(false);
    setIsDeleteConfirmed(false);
    setError(null);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={!isFirstModalOpen ? 'sm:max-w-[518px]' : 'sm:max-w-[400px]'}>
        <DialogHeader>
          <DialogTitle className="text-[#1B8392] text-xl font-medium ">
            Supprimer cet admin
          </DialogTitle>
          {error && (
            <DialogDescription className="text-red-500">{error}</DialogDescription>
          )}
        </DialogHeader>

        <div className="flex flex-col gap-6 placeholder:text-[#727272]">
          <div className="flex flex-col gap-2 p-5">
            <p className="text-[#959595] text-sm">
              Êtes-vous sûr de vouloir supprimer cet admin? Cette action ne peut être
              annulée.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            disabled={isPending}
            onClick={handleCloseModal}
            className="w-full bg-transparent border border-[#177C9A] rounded hover:opacity-80 text-[#177C9A]"
          >
            Annuler
          </Button>
          <Button
            onClick={handleDeleteEstab}
            type="submit"
            disabled={id === '' || isPending || !isDeleteConfirmed}
            className="w-full bg-[#F04438] hover:opacity-80 "
          >
            {isPending ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-t-transparent border-solid border-2 border-current rounded-full" />
                <div className="w-4 h-4 border-t-transparent border-solid border-2 border-current rounded-full" />
                <div className="w-4 h-4 border-t-transparent border-solid border-2 border-current rounded-full" />
                <div className="w-4 h-4 border-t-transparent border-solid border-2 border-current rounded-full" />
              </div>
            ) : (
              'Supprimer cet admin'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
