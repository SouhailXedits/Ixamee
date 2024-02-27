'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {  useState } from 'react';
import SubjectIcon, {
  subjectIcon,
} from '../../../../../../../../components/ui/SubjectIcon';
import * as Yup from 'yup';

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


const YupValidationSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Le nom doit comporter au moins 3 caractères')
    .required('Le nom est requis'),
  coefficient: Yup.number().positive('Le coefficient doit être positif').required('Le coefficient est requis'),
  icon: Yup.string().required("L'icône est requise"),
});
export const AddSubject = ({ children }: AjouterUneClasse) => {
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  // const [file, setFile] = useState<File | null>(null);
  // const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);
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
    validationSchema: YupValidationSchema,
    onSubmit: (values) => {
      createSubject(values);
      formik.resetForm();
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
            <div className="flex flex-col w-full gap-2">
              <Input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Entrer le nom de la matière"
                className="placeholder:text-[#727272]"
              />
              {formik.touched.name && formik.errors.name ? ( // Show error message if touched and there's an error
                <div className="text-7">{formik.errors.name}</div>
              ) : null}
            </div>
            <div className="flex flex-col w-full gap-2">
              <Input
                type="number"
                min={0}
                name="coefficient"
                value={formik.values.coefficient}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Saisir le coefficient de la matière"
                className="placeholder:text-[#727272]"
              />
              {formik.touched.coefficient && formik.errors.coefficient ? ( // Show error message if touched and there's an error
                <div className="text-7">{formik.errors.coefficient}</div>
              ) : null}
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
          <DialogFooter className="mt-3 ">
            {!formik.isValid && (
              <Button
                // onClick={() => setIsFirstModalOpen(!isFirstModalOpen)}
                type="submit"
                className="w-full bg-[#1B8392] hover:opacity-80 "
                disabled={!formik.isValid || isPending}
              >
                Ajouter une autre matière
              </Button>
            )}
            {formik.isValid && (
              <DialogClose className="w-full ">
              <Button
                // onClick={() => setIsFirstModalOpen(!isFirstModalOpen)}
                type="submit"
                className="w-full bg-[#1B8392] hover:opacity-80 "
                disabled={!formik.isValid || isPending}
              >
                Ajouter une autre matière
              </Button>
            </DialogClose>
            )}
            
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
