'use client';
import { Button, Label, Input } from '@/components/ui';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/dialog';
import { Image } from 'next/image';
import { useCreateEstab } from '../hooks/useCreateEstab';
import { useState } from 'react';

interface AddEstabProps {
  children: React.ReactNode;
}

export const AddEstab = ({ children }: AddEstabProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const { createEstablishment } = useCreateEstab();

  const handleCreateEstab = async () => {
    if (name.trim() === '') return;
    await createEstablishment(name);
    setName('');
    setIsOpen(false);
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Dialog open={isOpen} onOpenChange={toggleModal}>
      <DialogContent className="sm:max-w-[518px]">
        <DialogHeader>
          <DialogTitle className="text-[#1B8392] text-xl font-medium">
            Ajouter un établissement
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Label className="text-[#959595]">
              Nom : <span className="text-red">*</span>
            </Label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Entrer le nom de l'établissement"
              className="placeholder:text-[#727272]"
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose>
            <Button
              onClick={handleCreateEstab}
              type="submit"
              className="w-full bg-[#1B8392] hover:opacity-80"
              disabled={name.trim() === ''}
            >
              {name.trim() === '' ? 'Veuillez entrer un nom' : 'Ajouter'}
            </Button>
          </DialogClose>
        </DialogFooter>

        {name.trim() !== '' && (
          <DialogContent className="sm:max-w-[400px] mt-5">
            <DialogHeader>
              <DialogTitle className="text-[#1B8392] text-xl font-medium">
                Établissement ajouté
              </DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <div className="flex flex-col items-center justify-center gap-5">
                <Image
                  src={'/etudiantajouteravecsucces.svg'}
                  alt="add student done"
                  width={150}
                  height={150}
                  className=""
                />
                <div className="flex bg-[#E1FDEE] text-[#12B76A] items-center gap-4 p-2 pl-10 pr-10 rounded-lg ">
                  <Image
                    src={'/establishement-green.svg'}
                    alt="user"
                    width={15}
                    height={15}
                  />
                  Établissement ajouté avec succès.
                </div>
              </div>
            </DialogDescription>
            <DialogFooter>
              <DialogClose>
                <Button
                  onClick={toggleModal}
                  type="submit"
                  className="w-full bg-[#1B8392] hover:opacity-80"
                >
                  Ajouter une autre établissement
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        )}
      </DialogContent>
    </Dialog>
  );
};
