'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateTeacherSchema } from '@/actions/profile/schemas';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import Select from 'react-select';
import { getAllEstabs, getAllSubjects } from '@/actions/api';

interface EstabOption {
  id: number;
  value: string;
  label: string;
}

interface SubjectOption {
  id: number;
  value: string;
  label: string;
}

interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  government: string;
  image: string;
  subjects: SubjectOption[];
  establishments: EstabOption[];
}

export default function InfoCard({
  user,
  userEstablishment,
  teachersubject,
}: {
  user: any;
  userEstablishment: any[];
  teachersubject: any[];
}) {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [establishments, setEstablishments] = useState<EstabOption[]>([]);
  const [subjects, setSubjects] = useState<SubjectOption[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileUrl, setSelectedFileUrl] = useState<string>(user.image);
  const [govOptions, setGovOptions] = useState<any[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(UpdateTeacherSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      phoneNumber: user.phone_number || '',
      government: user.government || '',
      image: user.image,
      subjects: teachersubject.map((subject: any) => ({
        id: subject.id,
        value: subject.name,
        label: subject.name,
      })),
      establishments: userEstablishment.map((estab: any) => ({
        id: estab.id,
        value: estab.name,
        label: estab.name,
      })),
    },
  });

  const onSubmit = async (data: FormData) => {
    setError('');
    setSuccess('');

    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('upload_preset', 'firaslatrach');

      try {
        const response = await fetch(
          'https://api.cloudinary.com/v1_1/dm5d9jmf4/image/upload',
          {
            method: 'post',
            body: formData,
          }
        );

        if (response.ok) {
          const fileUrl = await response.json();
          data.image = fileUrl.url;
        } else {
          setError('Error uploading the file. Please try again.');
          return;
        }
      } catch (error) {
        setError('An error occurred during file upload. Please try again.');
        console.error(error);
        return;
      }
    }

    // Call the API to update the teacher information
    // Replace this with the actual API call
    setSuccess('Teacher information updated successfully');
  };

  useEffect(() => {
    (async () => {
      const estabData = await getAllEstabs();
      const subjectData = await getAllSubjects();

      setEstablishments(
        estabData.data.estabs.map((estab: any) => ({
          id: estab.id,
          value: estab.name,
          label: estab.name,
        }))
      );

      setSubjects(
        subjectData.data.map((subject: any) => ({
          id: subject.id,
          value: subject.name,
          label: subject.name,
        }))
      );

      setGovOptions(Tunisiangovernments);
    })();
  }, []);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setError('');
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      if (file.type.startsWith('image/') && file.size <= 2 * 1024 * 1024) {
        setSelectedFile(file);
        setSelectedFileUrl(URL.createObjectURL(file));
      } else {
        setError('Invalid file format or size. Please choose a valid image file (max 2MB).');
      }
    }
  };

  return (
    <div className="w-[50%] p-5 rounded-xl shadow-lg max-xl:w-full">
      <Form
        formState={{ errors }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-5 rounded-full">
            <div className="flex w-[100px] h-[100px] rounded-full ">
              <Image
                src={selectedFileUrl || '/uplodImage.svg'}
                alt="uplodImage"
                width={100}
                height={100}
                className="rounded-full cursor-pointer hover:opacity-7
