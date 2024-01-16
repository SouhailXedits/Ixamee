'use client';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RegisterEtudSchema } from '@/actions/auth/schemas';
import { Input } from '@/components/ui/auth-input';
import { Button } from '@/components/ui/button';
import FormError from '@/components/ui/form-error';
import FormSuccess from '@/components/ui/form-success';
import { useState } from 'react';
import { MdOutlineEmail } from 'react-icons/md';
import { IoKeyOutline } from 'react-icons/io5';
import { useTransition } from 'react';
import { LucidePencil } from 'lucide-react';
import { RiGovernmentLine } from 'react-icons/ri';
import { register } from '@/actions/auth/registerEtudiant';
import { SelectScrollable } from './SelectScrollable';
import { MdOutlineClass } from 'react-icons/md';
import { FaGraduationCap } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { getAllGovernments } from '@/actions/government';
import { getAllEstabs } from '@/actions/establishements';

interface ProfFormProps {
  handleRole: (role: string) => void;
}

export default function EtudiantForm({ handleRole }: ProfFormProps) {
  const [role, setRole] = useState<string>('STUDENT');
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const form = useForm<z.infer<typeof RegisterEtudSchema>>({
    resolver: zodResolver(RegisterEtudSchema),
    defaultValues: {
      role: '',
      nom: '',
      prenom: '',
      email: '',
      government: '',
      password: '',
      confirmPassword: '',
      etablissement: '',
      classe: '',
    },
  });
  const [showPassword, setShowPassword] = useState(false);

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
    data,
    error: getGovError,
    isPending,
  } = useQuery<any>({
    queryKey: ['goverments'],
    queryFn: async () => await getAllGovernments(),
  });

  const govOptions =
    (data?.data &&
      data?.data.map((gov: any) => {
        return { id: gov.id, value: gov.government, label: gov.government };
      })) ||
    [];

  const classOptions = [
    { id: 1, label: '7eme année', value: '7eme année' },
    { id: 2, label: '8eme année', value: '8eme année' },
    { id: 3, label: '9eme année', value: '9eme année' },
    { id: 4, label: '1ère année', value: '1ère année' },
    { id: 5, label: '2ème année', value: '2ème année' },
    { id: 6, label: '3ème année', value: '3ème année' },
    { id: 10, label: 'Bac informatique', value: 'Bac informatique' },
    { id: 10, label: 'Bac technique', value: 'Bac technique' },
    { id: 10, label: 'Bac science', value: 'Bac science' },
    { id: 10, label: 'Bac lettre', value: 'Bac lettre' },
    { id: 10, label: 'Bac math', value: 'Bac math' },
    { id: 10, label: 'Bac sport', value: 'Bac sport' },
  ];

  const [isTransPending, startTransition] = useTransition();

  const onSubmit = async (values: z.infer<typeof RegisterEtudSchema>) => {
    values.role = role;
    console.log('🚀 ~ file: EtudiantForm.tsx:58 ~ onSubmit ~ values:', values);
    setError('');
    setSuccess('');
    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        <FormError message={error} />
        <FormSuccess message={success} />

        <div
          id="ButtonsRoot"
          className="bg-[#99c6d3] flex flex-row gap-4 w-full cursor-pointer  items-start pt-2 px-1 rounded-[50px]"
        >
          <div
            id="Buttons"
            className={`text-center text-xl font-semibold capitalize text-white flex flex-row mb-2 w-1/2 h-12 items-start justify-center pt-2 px-4 rounded-[50px] ${
              role === 'TEACHER' ? 'bg-[#1b8392] ' : ''
            }`}
            onClick={() => {
              setRole('TEACHER');
              handleRole('TEACHER');
            }}
          >
            Professeur
          </div>
          <div
            id="Buttons1"
            className={`text-center text-xl font-semibold capitalize text-white flex flex-row mt-px w-1/2 h-12 items-start justify-center pt-2 px-4 rounded-[50px] ${
              role === 'STUDENT' ? 'bg-[#1b8392] ' : ''
            }`}
            onClick={() => {
              setRole('STUDENT');
              handleRole('STUDENT');
            }}
          >
            Étudiant
          </div>
        </div>

        <div className="flex flex-row w-full gap-4 max-sm:flex-col">
          <div className="w-full">
            <FormField
              control={form.control}
              name="nom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nom <span className="text-red"> *</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Entrez votre nom"
                      type="text"
                      icon={<LucidePencil className="text-gray w-5 h-5" />}
                      disabled={isTransPending}
                      className=" max-w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full">
            <FormField
              control={form.control}
              name="prenom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Prenom<span className="text-red"> *</span>
                  </FormLabel>
                  <FormControl className="relative">
                    <Input
                      {...field}
                      type="text"
                      placeholder="Entrez votre prénom"
                      icon={<LucidePencil className="text-gray w-5 h-5" />}
                      disabled={isTransPending}
                      className=" max-w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="w-full flex flex-row gap-4 max-sm:flex-col">
          <div className="w-full">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    E-mail<span className="text-red"> *</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Entrez votre e-mail"
                      type="email"
                      icon={<MdOutlineEmail className="text-gray w-5 h-5" />}
                      disabled={isTransPending}
                      className=" max-w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full">
            <FormField
              control={form.control}
              name="government"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Gouvernorat<span className="text-red"> *</span>
                  </FormLabel>
                  <FormControl className="flex-grow ">
                    <SelectScrollable
                      disabled={isTransPending || isPending}
                      field={field}
                      placeholder={'Choisissez votre gouvernorat'}
                      options={govOptions}
                      icon={<RiGovernmentLine className="text-gray w-5 h-5" />}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="w-full flex flex-row gap-4 max-sm:flex-col">
          <div className="w-full">
            <FormField
              control={form.control}
              name="etablissement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Établissement<span className="text-red"> *</span>
                  </FormLabel>
                  <FormControl className="flex-grow ">
                    <SelectScrollable
                      disabled={isTransPending || isPending}
                      field={field}
                      placeholder={'Choisissez votre établissement'}
                      options={estabOptions}
                      icon={<FaGraduationCap className="text-gray w-5 h-5" />}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full">
            <FormField
              control={form.control}
              name="classe"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Classe<span className="text-red"> *</span>
                  </FormLabel>
                  <FormControl className="flex-grow ">
                    <SelectScrollable
                      disabled={isTransPending}
                      field={field}
                      placeholder={'Sélectionnez votre classe'}
                      options={classOptions}
                      icon={<MdOutlineClass className="text-gray w-5 h-5" />}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="w-full flex flex-row gap-4 max-sm:flex-col">
          <div className="w-full">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Mot de passe<span className="text-red"> *</span>
                  </FormLabel>
                  <FormControl className="relative">
                    <Input
                      {...field}
                      placeholder="Entrez votre mot de passe"
                      type={showPassword ? 'text' : 'password'}
                      icon={<IoKeyOutline className="text-gray w-5 h-5" />}
                      disabled={isTransPending}
                      className=" max-w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full">
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" whitespace-nowrap">
                    Vérification du mot de passe*<span className="text-red"> *</span>
                  </FormLabel>
                  <FormControl className="relative">
                    <Input
                      {...field}
                      placeholder="Vérifiez le mot de passe"
                      type={showPassword ? 'text' : 'password'}
                      icon={<IoKeyOutline className="text-gray w-5 h-5" />}
                      disabled={isTransPending}
                      className=" max-w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button
          disabled={isTransPending}
          className="bg-[#99c6d3] font-semibold w-full h-12 pt-3 items-start justify-center rounded-lg text-center text-white text-base hover:opacity-75"
        >
          S&apos;inscrire
        </Button>
      </form>
    </Form>
  );
}
