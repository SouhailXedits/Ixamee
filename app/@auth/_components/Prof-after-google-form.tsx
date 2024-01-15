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
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useTransition } from 'react';
import { ProfAfterSchema } from '@/actions/auth/schemas';
import { SelectScrollable } from './SelectScrollable';
import { FaGraduationCap } from 'react-icons/fa';
import { MdOutlineClass } from 'react-icons/md';
import { MdOutlineTimer } from 'react-icons/md';
import { updateTeacherAfterGoogle } from '@/actions/auth/updateTeacherAfterGoogle';
import { auth } from '@/auth';
import FormError from '@/components/ui/form-error';
import FormSuccess from '@/components/ui/form-success';
import { useQuery } from '@tanstack/react-query';
import { getAllGovernments } from '@/actions/government';

interface ProfFormProps {
  handleRole: (role: string) => void;
}

export default async function ProfAfterGoogleForm({ handleRole }: ProfFormProps) {
  const [role, setRole] = useState<string>('TEACHER');
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  // const session = await auth();

  const form = useForm<z.infer<typeof ProfAfterSchema>>({
    resolver: zodResolver(ProfAfterSchema),
    defaultValues: {
      subject: '',
      etablissement: '',
      systeme: '',
    },
  });
  const {
    data,
    error: getEstabsError,
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
  const systeme = [
    { id: 1, value: 'TRIMESTRE', label: 'Trimestre' },
    { id: 2, value: 'SEMESTRE', label: 'Semestre' },
    { id: 3, value: 'LIBRE', label: 'Libre' },
  ];
  const [isTransPending, startTransition] = useTransition();

  const onSubmit = async (values: z.infer<typeof ProfAfterSchema>) => {
    values.role = role;
    // values.email = session.email || 'slimani@gmail.com';
    console.log(values, 'values');
    setError('');
    setSuccess('');
    startTransition(() => {
      updateTeacherAfterGoogle(values).then((data) => {
        setError(data?.error);
        // setSuccess(data?.success);
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

        <div className="w-full flex flex-col gap-4">
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
                    options={govOptions}
                    icon={<FaGraduationCap className="text-gray w-5 h-5" />}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Matière<span className="text-red"> *</span>
                </FormLabel>
                <FormControl className="flex-grow ">
                  <SelectScrollable
                  disabled={isTransPending || isPending}
                    field={field}
                    placeholder={'Choisissez votre matière'}
                    options={govOptions}
                    icon={<MdOutlineClass className="text-gray w-5 h-5" />}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="systeme"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Système pédagogique<span className="text-red"> *</span>
                </FormLabel>
                <FormControl className="flex-grow ">
                  <SelectScrollable
                  disabled={isTransPending || isPending}
                    field={field}
                    placeholder={'Choisissez votre système pédagogique'}
                    options={systeme}
                    icon={<MdOutlineTimer className="text-gray w-5 h-5" />}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          disabled={isTransPending}
          className="bg-[#99c6d3] font-semibold w-full h-12 pt-3 items-start justify-center rounded-lg text-center text-white text-base hover:opacity-75"
        >
          Suivant
        </Button>
      </form>
    </Form>
  );
}
