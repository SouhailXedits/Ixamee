'use client';
import * as z from 'zod';
import React, { useState, useTransition } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select as CustomSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/selectModifierStudent';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

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
import { updateTeacherCredentials } from '@/actions/profile/updateUserCredentials';
import FormError from '@/components/ui/form-error';
import FormSuccess from '@/components/ui/form-success';

export default function InfoCard({ user, userEstablishment, teachersubject }: any) {
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [phoneNumber, setPhoneNumber] = useState(user?.phone_number);
  const [government, setgovernment] = useState(user?.government);
  const govOptions = Tunisiangovernments;
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const {
    data: establishments,
    error: getEstabsError,
    isPending: estabPending,
  } = useQuery<any>({
    queryKey: ['establishments'],
    queryFn: async () => await getAllEstabs(),
  });
  const estabOptions =
    (establishments?.data &&
      establishments?.data?.estabs.map((estab: any) => {
        return { id: estab.id, value: estab.name, label: estab.name };
      })) ||
    [];

  const {
    data: subjects,
    error: getSubError,
    isPending: subPending,
  } = useQuery<any>({
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
      name: name,
      email: email,
      phone: phoneNumber || '',
      government: government,
      subject: defaultTeachersubject || [],
      etablissement: defaultTeacherestablishments || [],
    },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: z.infer<typeof UpdateTeacherSchema>) => {
    setError('');
    setSuccess('');
    startTransition(async () => {
      updateTeacherCredentials(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
        if (data.success) {
        }
      });
    });
  };

  return (
    <div className="w-[50%] p-5 rounded-xl shadow-lg max-xl:w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} method="post" className="flex flex-col gap-4">
          <FormError message={error} />
          <FormSuccess message={success} />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              {user?.image ? (
                <Image
                  src={user?.image}
                  alt="uplodImage"
                  width={100}
                  height={100}
                  className="rounded-full cursor-pointer"
                />
              ) : (
                <Image
                  src={'/uplodImage.svg'}
                  alt="uplodImage"
                  width={100}
                  height={100}
                  className="cursor-pointer"
                />
              )}

              <div className="flex flex-col gap-3">
                <span className="text-[#727272]">Ajouter une photo de profil</span>
                <span className="text-[#F04438]">Taille maximale est de 2 Mo</span>
              </div>
            </div>
            <div>
              <Image
                src={'/editeIcon.svg'}
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
                src={'/editeIcon.svg'}
                alt="editeIcon"
                width={20}
                height={20}
                className="cursor-pointer"
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
                src={'/editeIcon.svg'}
                alt="editeIcon"
                width={20}
                height={20}
                className="cursor-pointer"
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
                src={'/editeIcon.svg'}
                alt="editeIcon"
                width={20}
                height={20}
                className="cursor-pointer"
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
                      <CustomSelect>
                        <SelectTrigger className="w-[102%] border-none text-[#727272]">
                          <SelectValue defaultValue={government} placeholder={government} />
                        </SelectTrigger>
                        <SelectContent>
                          {govOptions.map((gov: any) => (
                            <SelectItem value={gov.value} key={gov.id}>
                              {gov.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </CustomSelect>
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
                        // defaultValue={userEstablishment || []}
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
                        isDisabled={subPending}
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
