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
import {  useState } from 'react';
import { useCreateEstab } from '../hooks/useCreateEstab';



interface AjouterUneClasse {
  children: React.ReactNode;
}
export const AddEstab = ({ children }: AjouterUneClasse) => {
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  // const [file, setFile] = useState<File | null>(null);
  // const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);
  const [name, setName] = useState("")
  const { createEstablishement } = useCreateEstab();
  console.log(name)
  
  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     const selectedFile = e.target.files[0];

  //     if (selectedFile.type.startsWith('image/') && selectedFile.size <= 2 * 1024 * 1024) {
  //       setFile(selectedFile);
  //       const fileUrl = URL.createObjectURL(selectedFile);
  //       setSelectedFileUrl(fileUrl);
  //     }
  //   }
  // };
  async function handleCreateEstab() {
    createEstablishement(name)
    setIsFirstModalOpen(!isFirstModalOpen)
  }

  function returnToCreate() {
    setIsFirstModalOpen(!isFirstModalOpen)
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
                onChange={(e) => setName(e.target.value)}
                placeholder="Entrer le nom de l'établissement"
                className="placeholder:text-[#727272]"
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-5">
            <Image
              src={'/etudiantajouteravecsucces.svg'}
              alt="add student done"
              width={150}
              height={150}
              className=""
            />
            <div className="flex bg-[#E1FDEE] text-[#12B76A] items-center gap-4 p-2 pl-10 pr-10 rounded-lg ">
              <Image src={'/establishement-green.svg'} alt="user" width={15} height={15} />
              Établissement ajouté avec succès.
            </div>
          </div>
        )}

        <DialogFooter>
          
          <Button
            onClick={() => {isFirstModalOpen? returnToCreate() : handleCreateEstab()}}
            type="submit"
            className="w-full bg-[#1B8392] hover:opacity-80 "
          >
            {isFirstModalOpen ? 'Ajouter une autre établissement' : 'Ajouter'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
