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
import { z } from 'zod';
import { error } from 'console';
import { useCreateUserInClasse } from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/classes/hooks/useCreteUser';
import { useQueryClient } from '@tanstack/react-query';

interface AjouterUneClasse {
  children: React.ReactNode;
  class_id: string;
  etab_id: number;
}
export const AjouterUnEtudiant = ({ children, class_id, etab_id }: AjouterUneClasse) => {
  const formatDataSchema = z.object({
    name: z.string().min(3, 'Veuillez renseigner le nom'),

    email: z.string().email("L'email n'est pas valide"),
  });
  const [formatData, setFormatData] = useState({
    name: '',
    email: '',
  });
  const handelUpdateSetFormatData = (key: string, value: string | number) => {
    setFormatData({ ...formatData, [key]: value });
  };
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']) as any;

  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [files, setFile] = useState<any>(null);
  const [selectedFileUrl, setSelectedFileUrl] = useState<string>('');
  const [selectedFileUrl1, setSelectedFileUrl1] = useState<string>('');

  const [formErrors, setFormErrors] = useState<z.ZodError | null>(null);

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
  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     const selectedFile = e.target.files[0];
  //     setFile(selectedFile);

  //     if (selectedFile.type.startsWith('image/') && selectedFile.size <= 2 * 1024 * 1024) {
  //       const form = new FormData();
  //       form.append('file', files as any);
  //       form.append('upload_preset', 'firaslatrach');
  //       const fileUrl = URL.createObjectURL(selectedFile);
  //       setSelectedFileUrl1(fileUrl);

  //       fetch('https://api.cloudinary.com/v1_1/dm5d9jmf4/image/upload', {
  //         method: 'post',
  //         body: form,
  //       })
  //         .then((resp) => resp.json())
  //         .then((data) => {
  //           setSelectedFileUrl(data.url);
  //         })
  //         .catch((err) =>
  //     }
  //   }
  // };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      if (selectedFile.type.startsWith('image/') && selectedFile.size <= 2 * 1024 * 1024) {
        try {
          const form = new FormData();
          form.append('file', selectedFile);
          form.append('upload_preset', 'firaslatrach');

          const response = await fetch('https://api.cloudinary.com/v1_1/dm5d9jmf4/image/upload', {
            method: 'post',
            body: form,
          });

          if (response.ok) {
            const data = await response.json();
            setSelectedFileUrl(data.url);
            setSelectedFileUrl1(URL.createObjectURL(selectedFile));
          } else {
          }
        } catch (error) {
          console.error(error);
        }
      } else {
      }
    }
  };

  const renderFieldError = (fieldName: string) => {
    if (formErrors) {
      const fieldError = formErrors?.errors?.find((error) => error.path[0] === fieldName);

      if (fieldError) {
        return <div className="mt-1 text-sm text-red">{fieldError.message}</div>;
      }
    }

    return null;
  };

  const { createUserInClass, isPending, error } = useCreateUserInClasse();

  const handelSubmit = () => {
    const validationResult = formatDataSchema.safeParse(formatData);

    if (validationResult.success) {
      createUserInClass({
        name: formatData.name,
        email: formatData.email.toLowerCase(),
        term: user?.term,
        image:
          selectedFileUrl ||
          'https://res.cloudinary.com/dm5d9jmf4/image/upload/v1706173047/hhg5o35yn2emjs9ehlb6.svg',
        class_id: class_id,
        establishmentId: etab_id,
      });
      setFormatData({
        name: '',
        email: '',
      });
      setSelectedFileUrl('');
      setSelectedFileUrl1('');

      if (!error) setIsFirstModalOpen(!isFirstModalOpen);

      // setIsFirstModalOpen(!isFirstModalOpen);
      setFormErrors(null); // Reset error state if submission is successful
    } else setFormErrors(validationResult.error);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[518px]">
        <DialogHeader>
          <DialogTitle className="text-[#1B8392] text-xl font-medium ">
            Ajouter un étudiant
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-6 placeholder:text-[#727272]">
          <div className="flex flex-col gap-2">
            <Label className="text-[#959595]">Photo de profil</Label>
            <input
              type="file"
              className="w-[200px] h-[60px] absolute opacity-0 cursor-pointer"
              accept="image/*"
              onChange={(e) => handleFileChange(e)}
            />
            <div className="flex items-center gap-3">
              {selectedFileUrl1 ? (
                <Image
                  src={selectedFileUrl1}
                  alt="upload"
                  width={55}
                  height={55}
                  className="object-cover rounded-full"
                />
              ) : (
                <Image
                  src={'/uploadimageicon.svg'}
                  alt="upload"
                  width={55}
                  height={55}
                  className="w-[55px] h-[55px]"
                />
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
              value={formatData.name}
              onChange={(e) => handelUpdateSetFormatData('name', e.target.value)}
            />
            {renderFieldError('name')}
          </div>
          {/* <div className="flex flex-col gap-2">
            <Label className="text-[#959595]">
              Rang dans la classe<span className="text-red">*</span>
            </Label>
            <Input
              placeholder="1"
              value={formatData.rang}
              type="number"
              min={minrange}
              onChange={(e) => handelUpdateSetFormatData('rang', e.target.value)}
              className="placeholder:text-[#727272]"
            />
            {renderFieldError('rang')}
          </div> */}
          <div className="flex flex-col gap-2">
            <Label className="text-[#959595]">
              E-mail <span className="text-red">*</span>
            </Label>
            <Input
              type="email"
              placeholder="Entrer l'email de l'étudiant."
              value={formatData.email}
              onChange={(e) => handelUpdateSetFormatData('email', e.target.value)}
              className="placeholder:text-[#727272]"
            />
            {renderFieldError('email')}
          </div>
        </div>

        <DialogFooter>
          {/* {isPending } */}
          <DialogClose className="w-full">
            <Button
              onClick={handelSubmit}
              type="submit"
              disabled={isPending}
              className="w-full bg-[#1B8392] hover:opacity-80 "
            >
              {isPending ? (
                <div
                  className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue rounded-full dark:text-blue"
                  role="status"
                  aria-label="loading"
                ></div>
              ) : isFirstModalOpen ? (
                'Ajouter un autre étudiant'
              ) : (
                'Ajouter'
              )}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
