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
import { useEffect, useState } from 'react';
import { EtudiantAjouteAvecSucces } from '../../../../../../../../components/modals/etudiant-ajoute-avec-succes';
import { useQuery } from '@tanstack/react-query';
import { getUserIdByEmail } from '@/actions/teachers';
import { useEditUser } from '../hooks/useEditUser';
interface AjouterUneClasse {
  children: React.ReactNode;
}
export const AddTeacher = ({ children }: AjouterUneClasse) => {
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);
  const { updateUserToAdmin, isPending } = useEditUser();

  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  function handleEmailChange(e: any) {
    setShowError(false);
    const value = e.target.value;
    setUserEmail(value);
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set a new timeout to perform the action after 500 milliseconds
    const timeoutId = setTimeout(async () => {
      const user = await getUserIdByEmail(value);
      console.log(user);
      if (user === null || (user?.role !== 'TEACHER' && user?.role !== 'ADMIN')) {
        setShowError(true);
        setUserId(null);
      }
      if (user) setUserId(user.id);
    }, 1000);

    setTypingTimeout(timeoutId);
  }

  function handleAddingAdmin() {
    console.log('clicked', userId);
    if (userId) {
      updateUserToAdmin(userId);
      console.log(userId);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={!isFirstModalOpen ? 'sm:max-w-[518px]' : 'sm:max-w-[400px]'}>
        <DialogHeader>
          <DialogTitle className="text-[#1B8392] text-xl font-medium ">
            Ajouter un admin
          </DialogTitle>
        </DialogHeader>

        {!isFirstModalOpen ? (
          <div className="flex flex-col gap-6 placeholder:text-[#727272]">
            <div className="flex flex-col gap-2">
              {showError && (
                <p className="rounded text-red p-1 text-sm bg-red/10">
                  Aucun enseignant n&apos;est inscrit avec cette adresse e-mail ou
                  l&apos;utilisateur n&apos;est pas un enseignant. Veuillez réessayer.
                </p>
              )}

              <Label className="text-[#959595]">
                E-mail <span className="text-red">*</span>
              </Label>
              <Input
                value={userEmail}
                onChange={(e) => handleEmailChange(e)}
                type="email"
                placeholder="Entrer l'e-amail de l'admin"
                className="placeholder:text-[#727272]"
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-5">
            <Image
              src={'/etudiantajouteravecsucces.svg'}
              alt=""
              width={150}
              height={150}
              className=""
            />
            <div className="flex bg-[#E1FDEE] text-[#12B76A] items-center gap-4 p-2 pl-10 pr-10 rounded-lg ">
              <Image src={'/greenusericon.svg'} alt="user" width={15} height={15} />
              admin ajouté avec succès.
            </div>
          </div>
        )}

        <DialogFooter>
          <DialogClose className=" w-full">
            <Button
              onClick={() => handleAddingAdmin()}
              type="submit"
              disabled={userId === null}
              className="w-full bg-[#1B8392] hover:opacity-80 "
            >
              Ajouter
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
