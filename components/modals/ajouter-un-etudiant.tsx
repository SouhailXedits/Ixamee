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
import { useCreateUserInClasse } from '@/app/@teacher/[etab_id]/(teacherdashboard)/(routes)/classes/hooks/useCreteUser';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

interface AjouterUneClasse {
  children: React.ReactNode;
  class_id: string;
  etab_id: number;
}

const AjouterUnEtudiant = ({ children, class_id, etab_id }: AjouterUneClasse) => {
  const formatDataSchema = z.object({
    name: z.string().min(3, 'Veuillez renseigner le nom'),
    email: z.string().email('L\'email n\'est pas valide'),
  });

  const [formatData, setFormatData] = useState({
    name: '',
    email: '',
  });

  const [formErrors, setFormErrors] = useState<z.ZodError | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileUrl, setSelectedFileUrl] = useState<string>('');
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']) as any;
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];

      if (selectedFile.type.startsWith('image/') && selectedFile.size <= 2 * 1024 * 1024) {
        setSelectedFile(selectedFile);
        const fileUrl = URL.createObjectURL(selectedFile);
        setSelectedFileUrl(fileUrl);
      }
    }
  };

  const handelSubmit = async () => {
    const validationResult = formatDataSchema.safeParse(formatData);

    if (validationResult.success) {
      try {
        if (selectedFile) {
          const form = new FormData();
          form.append('file', selectedFile);
          form.append('upload_preset', 'firaslatrach');

          const response = await fetch(
            'https://api.cloudinary.com/v1_1/dm5d9jmf4/image/upload',
            {
              method: 'post',
              body: form,
            }
          );

          if (response.ok) {
            const data = await response.json();
            const imageUrl = data.url;

            createUserInClasse({
              name: formatData.name,
              email: formatData.email.toLowerCase(),
              term: user?.term,
              image: imageUrl,
              class_id: class_id,
              establishmentId: etab_id,
            });

            setFormatData({
              name: '',
              email: '',
            });
            setSelectedFile(null);
            setSelectedFileUrl('');
            setIsFirstModalOpen(true);
            setFormErrors(null);
          } else {
            throw new Error('Image upload failed');
          }
        } else {
          createUserInClasse({
            name: formatData.name,
            email: formatData.email.toLowerCase(),
            term: user?.term,
            image:
              'https://res.cloudinary.com/dm5d9jmf4/image/upload/v1706173047/hhg5o35yn2emjs9ehlb6.svg',
            class_id: class_id,
            establishmentId: etab_id,
          });

          setFormatData({
            name: '',
            email: '',
          });
          setSelectedFile(null);
          setSelectedFileUrl('');
          setIsFirstModalOpen(true);
          setFormErrors(null);
        }
      } catch (error) {
        console.error(error);
        setFormErrors(new z.ZodError([{ message: 'Error creating user', path: ['email'] }]));
      }
    } else {
      setFormErrors(validationResult.error);
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

  useEffect(() => {
    if (error) {
      setFormErrors(new z.ZodError([{ message: error.message, path: ['email'] }]));
    }
  }, [error]);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[518px]">

