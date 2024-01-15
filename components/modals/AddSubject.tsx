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
import SubjectIcon from '../ui/SubjectIcon';

import { useFormik } from 'formik';
interface AjouterUneClasse {
  children: React.ReactNode;
}


interface IconsTypes {
  id: string;
  src: string;
  alt: string;
}

const icons = [
  {
    id: 'zrgzeghzeha',
    src: '/subjects/geographie.svg',
    alt: "icon of earth"
  },
  {
    id: 'zrgzeghzfetzeha',
    src: '/subjects/geographie.svg',
    alt: "icon of earth"
  },
  {
    id: 'zrgzeghterzeezha',
    src: '/subjects/geographie.svg',
    alt: "icon of earth"
  },
  {
    id: 'zrgzeghzeferzha',
    src: '/subjects/geographie.svg',
    alt: "icon of earth"
  },
  {
    id: 'zrretgzeghzefzha',
    src: '/subjects/geographie.svg',
    alt: "icon of earth"
  },
  {
    id: 'zrgzeghzeeefzha',
    src: '/subjects/geographie.svg',
    alt: "icon of earth"
  },
  {
    id: 'zrgzeghehezefzha',
    src: '/subjects/geographie.svg',
    alt: "icon of earth"
  },
  {
    id: 'zrgzeghrfthzefzha',
    src: '/subjects/geographie.svg',
    alt: "icon of earth"
  },
]


export const AddSubject = ({ children }: AjouterUneClasse) => {
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
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

  const handleIconClick = (selectedIcon) => {
    formik.setFieldValue('icon_url', selectedIcon.src);
  };
  const formik = useFormik({
    initialValues: {
      name: '',
      coefficient: 1,
      icon_url: ''
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values)
      //alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={!isFirstModalOpen ? 'sm:max-w-[518px]' : 'sm:max-w-[400px]'}>
        <DialogHeader>
          <DialogTitle className="text-[#1B8392] text-xl font-medium ">
            Ajouter une matière
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit}>
          {!isFirstModalOpen ? (
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
              <div className=" flex gap-5 max-w-[450px] border rounded p-3 flex-wrap">
                {icons.map((icon) => (
                  <SubjectIcon key={icon.id} icon={icon} onClick={() => handleIconClick(icon)} />
                ))}
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
                <Image src={'/subjects-green.svg'} alt="user" width={15} height={15} />
                Matière ajoutée avec succès.
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              // onClick={() => setIsFirstModalOpen(!isFirstModalOpen)}
              type="submit"
              className="w-full bg-[#1B8392] hover:opacity-80 "
            >
              {isFirstModalOpen ? 'Ajouter une autre matière' : 'Ajouter'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
