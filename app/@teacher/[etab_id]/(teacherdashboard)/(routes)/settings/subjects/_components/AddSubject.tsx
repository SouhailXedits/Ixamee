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
import SubjectIcon, {
  SubjectIconProps,
  subjectIcon,
} from '../../../../../../../../components/ui/SubjectIcon';

import { useFormik } from 'formik';
import { useCreateSubject } from '../hooks/useCreateSubject';
import { icons } from '../assets/subjectsIcons';
interface AjouterUneClasse {
  children: React.ReactNode;
}

// interface IconsTypes {
//   id: string;
//   src: string;
//   alt: string;
// }



export const AddSubject = ({ children }: AjouterUneClasse) => {
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);
  const { createSubject, isPending } = useCreateSubject();
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

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

  const handleIconClick = (selectedIcon: subjectIcon) => {
    formik.setFieldValue('icon', selectedIcon.src);
    setSelectedIcon(selectedIcon.id);
  };
  const formik = useFormik({
    initialValues: {
      name: '',
      coefficient: 1,
      icon: '',
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      createSubject(values);
      console.log('end');
      //alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={!isFirstModalOpen ? 'sm:max-w-[518px]' : 'sm:max-w-[400px]'}>
        <form onSubmit={formik.handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-[#1B8392] text-xl font-medium ">
              Ajouter une matière
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-6 placeholder:text-[#727272] items-center">
            <div className="flex flex-col gap-2 w-full">
              <Input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                placeholder="Entrer le nom de la matière"
                className="placeholder:text-[#727272]"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Input
                type="number"
                name="coefficient"
                value={formik.values.coefficient}
                onChange={formik.handleChange}
                placeholder="Saisir le coefficient de la matière"
                className="placeholder:text-[#727272]"
              />
            </div>
            <div className=" flex gap-[0.8rem] max-w-[450px] border rounded p-3 flex-wrap">
              {icons.map((icon) => (
                <SubjectIcon
                  key={icon.id}
                  icon={icon}
                  onClick={() => handleIconClick(icon)}
                  isSelected={selectedIcon === icon.id}
                />
              ))}
            </div>
          </div>
          <DialogFooter className=' mt-3'>
            <DialogClose className=' w-full'>
              <Button
                // onClick={() => setIsFirstModalOpen(!isFirstModalOpen)}
                type="submit"
                className="w-full bg-[#1B8392] hover:opacity-80 "
              >
                Ajouter une autre matière
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
