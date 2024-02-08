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
import Image from 'next/image';
import { useState } from 'react';
import { z } from 'zod';
import { useCreateUserInClasse } from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/classes/hooks/useCreteUser';
import { useUpdateUserInClasse } from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/classes/hooks/useEditeUser';

interface ModifierUnEtudiant {
  children: React.ReactNode;
  data: any;
}
export const ModifierUnEtudiant = ({ children, data }: ModifierUnEtudiant) => {
  const minrange = data?.length;
  const formatDataSchema = z.object({
    name: z.string().min(3, 'Veuillez renseigner le nom'),

    email: z.string().email("L'email n'est pas valide"),
  });
  const [formatData, setFormatData] = useState({
    name: data.name,
    email: data.email,
  });
  const handelUpdateSetFormatData = (key: string, value: string | number) => {
    setFormatData({ ...formatData, [key]: value });
  };
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [files, setFile] = useState<any>(null);
  const [selectedFileUrl1, setSelectedFileUrl1] = useState<string>('');

  const [selectedFileUrl, setSelectedFileUrl] = useState<string>('');
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

  const { updateUserInClasse, isPending } = useUpdateUserInClasse();

  const handelSubmit = () => {
    const validationResult = formatDataSchema.safeParse(formatData);

    if (validationResult.success) {
      // createUserInClass({
      //   name: formatData.name,
      //   range: +formatData.rang,
      //   email: formatData.email.toLowerCase(),
      //   image: selectedFileUrl,
      //   // class_id: class_id,
      //   // establishmentId: etab_id,
      // });id: string, name: string, email: string, image: string
      updateUserInClasse({
        id: data.id,
        name: formatData.name,
        email: formatData.email.toLowerCase(),
        image: selectedFileUrl,
      });
      // if (!) setIsFirstModalOpen(!isFirstModalOpen);
      // else {

      // }

      // setIsFirstModalOpen(!isFirstModalOpen);
      setFormErrors(null); // Reset error state if submission is successful
    } else setFormErrors(validationResult.error);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={!isFirstModalOpen ? 'sm:max-w-[518px]' : 'sm:max-w-[400px]'}>
        <DialogHeader>
          <DialogTitle className="text-[#1B8392] text-xl font-medium ">
            Modifier votre étudiant
          </DialogTitle>
        </DialogHeader>

        {/* {!isFirstModalOpen ? ( */}
        <div className="flex flex-col gap-6 placeholder:text-[#727272]">
          <div className="flex flex-col gap-2">
            <Label className="text-[#959595]">Photo de profil</Label>
            <input
              type="file"
              className="w-[200px] h-[60px] text-[#727272] absolute opacity-0 cursor-pointer"
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
                  className="object-cover rounded-full w-[55px] h-[55px] "
                />
              ) : (
                <Image
                  src={data.image ? data.image : '/uploadimageicon.svg'}
                  alt="upload"
                  width={55}
                  height={55}
                  className="object-cover rounded-full w-[55px] h-[55px] "
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
              className="placeholder:text-[#727272] text-[#727272]"
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
              placeholder="Entrer l’e-amail de l’étudiant"
              value={formatData.email}
              onChange={(e) => handelUpdateSetFormatData('email', e.target.value)}
              className="placeholder:text-[#727272] text-[#727272]"
            />
            {renderFieldError('email')}
          </div>
        </div>

        <DialogFooter>
          <DialogClose className="w-[50%]">
            <Button
              type="reset"
              className="w-full bg-white hover:opacity-80 text-[#1B8392] border border-[#1B8392] "
            >
              Annuler
            </Button>
          </DialogClose>
          {isPending ? (
            <Button
              onClick={handelSubmit}
              type="submit"
              className="w-[50%]  bg-[#1B8392] hover:opacity-80 "
            >
              <div
                className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue rounded-full dark:text-blue"
                role="status"
                aria-label="loading"
              ></div>
            </Button>
          ) : (
            <DialogClose asChild>
              <Button
                onClick={handelSubmit}
                type="submit"
                className="w-[50%]  bg-[#1B8392] hover:opacity-80 "
              >
                Enregistrer
              </Button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
