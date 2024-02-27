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
import { getIsEstabNameUnique } from '@/actions/establishements';

interface AjouterUneClasse {
  children: React.ReactNode;
}
export const AddEstab = ({ children }: AjouterUneClasse) => {
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [name, setName] = useState('');
  const { createEstablishement } = useCreateEstab();
  const [isUnique, setIsUnique] = useState(false);

  async function handleCreateEstab() {
    createEstablishement(name);
  }

  function returnToCreate() {
    setIsFirstModalOpen(!isFirstModalOpen);
  }

  async function checkIsUniqueHandler(value: string) {
    const data = await getIsEstabNameUnique(value);
    if (data) setIsUnique(false);
    else {
      setIsUnique(true);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={!isFirstModalOpen ? 'sm:max-w-[518px]' : 'sm:max-w-[400px]'}>
        <DialogHeader>
          <DialogTitle className="text-[#1B8392] text-xl font-medium ">
            Ajouter une établissement
          </DialogTitle>
        </DialogHeader>

        {!isFirstModalOpen ? (
          <div className="flex flex-col gap-6 placeholder:text-[#727272]">
            <div className="flex flex-col gap-2">
              <Label className="text-[#959595]">
                Nom : <span className="text-red">*</span>
              </Label>
              <Input
                type="text"
                onChange={(e) => {
                  checkIsUniqueHandler(e.target.value);
                  setName(e.target.value);
                }}
                placeholder="Entrer le nom de l'établissement"
                className="placeholder:text-[#727272]"
              />
              {!isUnique && <p className="text-red">Cet nom d'établissement est déjà utilisé</p>}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-5">
            <Image
              src={'/etudiantajouteravecsucces.svg'}
              alt="add student done"
              width={150}
              height={150}
            />
            <div className="flex bg-[#E1FDEE] text-[#12B76A] items-center gap-4 p-2 pl-10 pr-10 rounded-lg ">
              <Image src={'/establishement-green.svg'} alt="user" width={15} height={15} />
              Établissement ajouté avec succès.
            </div>
          </div>
        )}

        <DialogFooter>
          {!isUnique ? (
              <Button
                onClick={() => {
                  isFirstModalOpen ? returnToCreate() : handleCreateEstab();
                }}
                disabled={!isUnique || name === ''}
                type="submit"
                className="w-full bg-[#1B8392] hover:opacity-80 "
              >
                {isFirstModalOpen ? 'Ajouter une autre établissement' : 'Ajouter'}
              </Button>
            ) : (
              <DialogClose className=' w-full'>
                <Button
                  onClick={() => {
                    isFirstModalOpen ? returnToCreate() : handleCreateEstab();
                  }}
                  disabled={!isUnique || name === ''}
                  type="submit"
                  className="w-full bg-[#1B8392] hover:opacity-80 "
                >
                  {isFirstModalOpen ? 'Ajouter une autre établissement' : 'Ajouter'}
                </Button>
              </DialogClose>
            )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
