'use client';
import * as z from 'zod';
import React, { useEffect, useState, useTransition } from 'react';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useRef } from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { getAllEstabs } from '@/actions/establishements';
import Select from 'react-select';
import { getAllSubjects } from '@/actions/subjects';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateTeacherSchema } from '@/actions/profile/schemas';
import { Button } from '@/components/ui/button';
import { Tunisiangovernments } from '@/public/auth/data/TunisianGovernments';
import FormError from '@/components/ui/form-error';
import FormSuccess from '@/components/ui/form-success';
import { useUpdateCredentials } from '../hooks/useUpdateCredentials';

export default function InfoCard({ user, userEstablishment, teachersubject }: any) {
  const { name, email, phone_number: phoneNumber, government } = user;
  const govOptions = Tunisiangovernments;
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [initialValues, setInitialValues] = useState<z.infer<typeof UpdateTeacherSchema> | null>(
    null
  );

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  const [files, setFile] = useState<any>(null);
  const [selectedFileUrl, setSelectedFileUrl] = useState<string>(user.image);
  const [selectedFileUrl1, setSelectedFileUrl1] = useState<string>(user.image);

  const { data: establishments, isPending: estabPending } = useQuery<any>({
    queryKey: ['establishments'],
    queryFn: async () => await getAllEstabs(),
  });
  const estabOptions =
    (establishments?.data &&
      establishments?.data?.estabs.map((estab: any) => {
        return { id: estab.id, value: estab.name, label: estab.name };
      })) ||
    [];

  const { data: subjects, isPending: subPending } = useQuery<any>({
    queryKey: ['subjects'],
    queryFn: async () => await getAllSubjects(),
  });

  const subjectOptions =
    (subjects?.data &&
      subjects?.data.map((subject: any) => {
        return { id: subject.id, value: subject.name, label: subject.name };
      })) ||
    [];
  const defaultTeacherestablishments =
    (userEstablishment &&
      userEstablishment.map((estab: any) => {
        return { id: estab.id, value: estab.name, label: estab.name };
      })) ||
    [];
  const defaultTeachersubject =
    teachersubject &&
    teachersubject.map((subject: any) => {
      return { id: subject.id, value: subject.name, label: subject.name };
    });

  const form = useForm<z.infer<typeof UpdateTeacherSchema>>({
    resolver: zodResolver(UpdateTeacherSchema),
    defaultValues: {
      image: selectedFileUrl,
      name: name,
      email: email,
      phone: phoneNumber || '',
      government: government,
      subject: defaultTeachersubject || [],
      etablissement: defaultTeacherestablishments || [],
    },
  });

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setInitialValues({
      image: selectedFileUrl,
      name: name,
      email: email,
      phone: phoneNumber || '',
      government: government,
      subject: defaultTeachersubject || [],
      etablissement: defaultTeacherestablishments || [],
    });
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
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
            setError('Error uploading the file. Please try again.');
          }
        } catch (error) {
          setError('An error occurred during file upload. Please try again.');
          console.error(error);
        }
      } else {
        setError('Invalid file format or size. Please choose a valid image file (max 2MB).');
      }
    }
  };
  const { updateUser, isPending: updatePending } = useUpdateCredentials();
  const onSubmit = (values: z.infer<typeof UpdateTeacherSchema>) => {
    setError('');
    setSuccess('');
    values.image = selectedFileUrl || user?.image;
    startTransition(async () => {
      const isFormChanged =
        values.image !== initialValues?.image ||
        values.name !== initialValues?.name ||
        values.email !== initialValues?.email ||
        values.phone !== initialValues?.phone ||
        values.government !== initialValues?.government ||
        JSON.stringify(values.subject) !== JSON.stringify(initialValues?.subject) ||
        JSON.stringify(values.etablissement) !== JSON.stringify(initialValues?.etablissement);
      if (isFormChanged) {
        updateUser(values);
      } else {
        setError('Aucune modification détectée.');
      }
    });
  };

  return (
    <div className="w-[50%] p-5 rounded-xl shadow-lg max-xl:w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} method="post" className="flex flex-col gap-4">
          <FormError message={error} />
          <FormSuccess message={success} />
          <div className="flex items-center justify-between ">
            <div className="flex items-center gap-5 rounded-full">
              <div className="flex w-[100px] h-[100px] rounded-full ">
                <Image
                  src={selectedFileUrl1 || '/uplodImage.svg'}
                  alt="uplodImage"
                  width={100}
                  height={100}
                  className="rounded-full cursor-pointer hover:opacity-75 object-cover"
                />
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-[#727272]">Ajouter une photo de profil</span>
                <span className="text-[#F04438]">Taille maximale est de 2 Mo</span>
              </div>
            </div>
            <div>
              <input
                type="file"
                className="w-[200px] h-[60px] absolute opacity-0 cursor-pointer"
                accept="image/*"
                onChange={(e) => handleFileChange(e)}
              />
              <Image
                src={'/editeicon.svg'}
                alt="editeIcon"
                width={20}
                height={20}
                className="cursor-pointer"
              />
            </div>
          </div>
          <div className="text-[#1B8392] text-lg">Informations personnelles</div>
          <div className="flex justify-between p-1 rounded-lg border-l-[4px] border-[#99C6D3] items-center ">
            <div className="w-full">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#727272] pl-3">Nom et prénom</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        ref={nameInputRef}
                        placeholder="Entrez votre e-mail"
                        type="text"
                        disabled={isPending}
                        defaultValue={name}
                        className="border-none w-full placeholder:text-[#727272] text-[#727272]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <Image
                src={'/editeicon.svg'}
                alt="editeIcon"
                width={20}
                height={20}
                className="cursor-pointer"
                onClick={() => nameInputRef.current?.focus()}
              />
            </div>
          </div>

          <div className="flex justify-between p-1 rounded-lg border-l-[4px] border-[#99C6D3] items-center ">
            <div className="w-full">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#727272] pl-3">E-mail</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        ref={emailInputRef}
                        defaultValue={email}
                        placeholder="Entrez votre e-mail"
                        type="email"
                        disabled={isPending}
                        className="border-none w-full placeholder:text-[#727272] text-[#727272]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <Image
                src={'/editeicon.svg'}
                alt="editeIcon"
                width={20}
                height={20}
                className="cursor-pointer"
                onClick={() => emailInputRef.current?.focus()}
              />
            </div>
          </div>
          <div className="flex justify-between p-1 rounded-lg border-l-[4px] border-[#99C6D3] items-center ">
            <div className="w-full">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#727272] pl-3">Numéro de téléphone</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        ref={phoneInputRef}
                        defaultValue={phoneNumber}
                        placeholder={
                          phoneNumber ? phoneNumber : 'Ajouter votre numéro de telephone'
                        }
                        type="text"
                        disabled={isPending}
                        className="border-none w-full placeholder:text-[#727272] text-[#727272]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <Image
                src={'/editeicon.svg'}
                alt="editeIcon"
                width={20}
                height={20}
                className="cursor-pointer"
                onClick={() => phoneInputRef.current?.focus()}
              />
            </div>
          </div>
          <div className="flex justify-between p-1 rounded-lg border-l-[4px] border-[#99C6D3] items-center ">
            <div className="w-full">
              <FormField
                control={form.control}
                name="government"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#727272] pl-3">Gouvernorat</FormLabel>
                    <FormControl>
                      <Select
                        isDisabled={isPending}
                        name="government"
                        options={govOptions}
                        placeholder={government}
                        isSearchable={true}
                        styles={{
                          control: (provided, state) => ({
                            ...provided,
                            borderColor: 'transparent',
                            '&:hover': {
                              borderColor: 'transparent',
                            },
                            width: '101.5%',
                          }),
                          option: (provided, state) => ({
                            ...provided,
                            fontSize: '14px',
                            backgroundColor: state.isFocused ? '#F0F6F8' : 'transparent',
                            '&:hover': {
                              backgroundColor: '#F0F6F8',
                            },
                          }),
                          multiValue: (provided, state) => ({
                            ...provided,
                            backgroundColor: '#F0F6F8',
                          }),
                          dropdownIndicator: (provided, state) => ({
                            ...provided,
                            color: '#1B8392',
                          }),
                          indicatorSeparator: (provided, state) => ({
                            ...provided,
                            display: 'none',
                          }),
                          placeholder: (provided, state) => ({
                            ...provided,
                            color: '#727272',
                          }),
                        }}
                        onChange={(selectedOption) => field.onChange(selectedOption?.value || '')}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-between p-1 rounded-lg border-l-[4px] border-[#99C6D3] items-center ">
            <div className="w-full">
              <FormField
                control={form.control}
                name="etablissement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#727272] pl-3">Établissement</FormLabel>
                    <FormControl>
                      <Select
                        isDisabled={isPending || estabPending}
                        isMulti
                        name="user Establishment"
                        options={estabOptions}
                        placeholder={
                          defaultTeacherestablishments && defaultTeacherestablishments.length
                            ? defaultTeacherestablishments.map((estab: any) => estab?.name)
                            : 'Ajouter votre/vos etablissement(s)'
                        }
                        isSearchable={true}
                        styles={{
                          control: (provided, state) => ({
                            ...provided,
                            borderColor: 'transparent',
                            '&:hover': {
                              borderColor: 'transparent',
                            },
                            width: '101.5%',
                          }),
                          option: (provided, state) => ({
                            ...provided,
                            fontSize: '14px',
                            backgroundColor: state.isFocused ? '#F0F6F8' : 'transparent',
                            '&:hover': {
                              backgroundColor: '#F0F6F8',
                            },
                          }),
                          multiValue: (provided, state) => ({
                            ...provided,
                            backgroundColor: '#F0F6F8',
                          }),
                          dropdownIndicator: (provided, state) => ({
                            ...provided,
                            color: '#1B8392',
                          }),
                          clearIndicator: (provided, state) => ({
                            ...provided,
                            color: '#1B8392',
                          }),
                          indicatorSeparator: (provided, state) => ({
                            ...provided,
                            display: 'none',
                          }),
                          placeholder: (provided, state) => ({
                            ...provided,
                            color: '#727272',
                          }),
                        }}
                        value={estabOptions.filter((option: any) =>
                          field.value.some((selectedOption) => selectedOption.id === option.id)
                        )}
                        onChange={(selectedOptions) => field.onChange(selectedOptions)}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors?.etablissement &&
                        form.formState.errors.etablissement.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-between p-1 rounded-lg border-l-[4px] border-[#99C6D3] items-center ">
            <div className="w-full">
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#727272] pl-3">Matière</FormLabel>
                    <FormControl>
                      <Select
                        isMulti
                        name="teacher subject"
                        options={subjectOptions}
                        placeholder={
                          defaultTeachersubject && defaultTeachersubject.length
                            ? defaultTeachersubject.map((subject: any) => subject?.name)
                            : 'Ajouter votre/vos matière(s)'
                        }
                        isSearchable={true}
                        isDisabled={subPending || isPending}
                        styles={{
                          control: (provided, state) => ({
                            ...provided,
                            borderColor: 'transparent',
                            '&:hover': {
                              borderColor: 'transparent',
                            },
                            width: '101.5%',
                          }),
                          option: (provided, state) => ({
                            ...provided,
                            fontSize: '14px',
                            backgroundColor: state.isFocused ? '#F0F6F8' : 'transparent',
                            '&:hover': {
                              backgroundColor: '#F0F6F8',
                            },
                            width: '101.5%',
                          }),
                          multiValue: (provided, state) => ({
                            ...provided,
                            backgroundColor: '#F0F6F8',
                          }),
                          dropdownIndicator: (provided, state) => ({
                            ...provided,
                            color: '#1B8392',
                          }),
                          clearIndicator: (provided, state) => ({
                            ...provided,
                            color: '#1B8392',
                          }),
                          indicatorSeparator: (provided, state) => ({
                            ...provided,
                            display: 'none',
                          }),
                          placeholder: (provided, state) => ({
                            ...provided,
                            color: '#727272',
                          }),
                        }}
                        value={subjectOptions.filter((option: any) =>
                          field.value.some((selectedOption) => selectedOption.id === option.id)
                        )}
                        onChange={(selectedOptions) => field.onChange(selectedOptions)}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors?.subject && form.formState.errors.subject.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-end w-full cursor-pointer ">
            <Button
              name="submitButton"
              type="submit"
              disabled={isPending}
              className={`${
                form.formState.isValid ? 'bg-[#1B8392]' : 'bg-[#99c6d3]'
              } text-white w-[110px] text-center flex rounded-lg hover:opacity-75`}
            >
              Enregistrer
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
