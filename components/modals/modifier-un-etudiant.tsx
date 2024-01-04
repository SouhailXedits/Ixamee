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
import { EtudiantAjouteAvecSucces } from './etudiant-ajoute-avec-succes';
interface ModifierUnEtudiant {
  children: React.ReactNode;
}
export const ModifierUnEtudiant = ({ children }: ModifierUnEtudiant) => {
  const [file, setFile] = useState<File | null>(null);
  const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];

      if (selectedFile.type.startsWith('image/') && selectedFile.size <= 2 * 1024 * 1024) {
        setFile(selectedFile);
        const fileUrl = URL.createObjectURL(selectedFile);
        setSelectedFileUrl(fileUrl);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[518px]">
        <DialogHeader>
          <DialogTitle className="text-[#1B8392] text-xl font-medium ">
            Modifier votre étudiant
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-6 placeholder:text-[#727272]">
          <div className="flex flex-col gap-2">
            <Label className="text-[#959595]">Photo de profil</Label>
            <Input
              type="file"
              className="w-[200px] h-[60px] absolute opacity-0 cursor-pointer"
              accept="image/*"
              onChange={(e) => handleFileChange(e)}
            />
            <div className="flex items-center gap-3">
              {selectedFileUrl ? (
                <Image
                  src={selectedFileUrl}
                  alt="upload"
                  width={55}
                  height={55}
                  className="object-cover rounded-full"
                />
              ) : (
                <Image src={'/uploadimageicon.svg'} alt="upload" width={55} height={55} />
              )}
              <div className="flex flex-col items-start justify-start text-[#727272] gap-2">
                <span className="text-sm">Ajoutez une photo</span>
                <span className="text-xs">Taille maximale : 2Mo</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-[#959595]">
              Nom et prénom <span className="text-red">*</span>{' '}
            </Label>
            <Input
              placeholder="Entrer le nom complet de l’étudiant"
              className="placeholder:text-[#727272]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-[#959595]">
              Rang dans la classe<span className="text-red">*</span>
            </Label>
            <Input placeholder="1" />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-[#959595]">
              E-mail <span className="text-red">*</span>
            </Label>
            <Input
              type="email"
              placeholder="Entrer l’e-amail de l’étudiant"
              className="placeholder:text-[#727272]"
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="submit"
              className="w-full bg-white text-[#1B8392] border border-[#1B8392] rounded-lg hover:opacity-80 "
            >
              Annuler
            </Button>
          </DialogClose>
          <Button disabled type="submit" className="w-full bg-[#1B8392] hover:opacity-80 ">
            Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
