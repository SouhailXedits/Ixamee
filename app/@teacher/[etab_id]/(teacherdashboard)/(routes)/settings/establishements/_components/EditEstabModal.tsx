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

interface editEstabProps {
  id: number;
  currentName: string;
  open: boolean;
  setOpen: (value: boolean) => void;
}
export const EditEstab = ({ id, currentName, open, setOpen }: editEstabProps) => {
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);

  // const [file, setFile] = useState<File | null>(null);
  // const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);
  const [name, setName] = useState('');
  const { editEstablishement, isPending } = useEditEstab();

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

  async function handlEditEstab() {
    editEstablishement({ id, name });
    if (!isPending) setIsFirstModalOpen(!isFirstModalOpen);
  }

  function returnToCreate() {
    setIsFirstModalOpen(!isFirstModalOpen);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger asChild>{children}</DialogTrigger> */}
      <DialogContent className={!isFirstModalOpen ? 'sm:max-w-[518px]' : 'sm:max-w-[400px]'}>
        <DialogHeader>
          <DialogTitle className="text-[#1B8392] text-xl font-medium ">
            Editer une établissement
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-6 placeholder:text-[#727272]">
          <div className="flex flex-col gap-2">
            <Label className="text-[#959595]">
              Nom : <span className="text-red">*</span>
            </Label>
            <Input
              type="text"
              defaultValue={currentName}
              onChange={(e) => setName(e.target.value)}
              placeholder="Entrer le nom de l'établissement"
              className="placeholder:text-[#727272]"
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose className=" w-full">
            <Button
              onClick={() => {
                isFirstModalOpen ? returnToCreate() : handlEditEstab();
              }}
              type="submit"
              disabled={isPending}
              className="w-full bg-[#1B8392] hover:opacity-80 "
            >
              Modifier une établissement.
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
