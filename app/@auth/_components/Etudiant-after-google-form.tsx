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
import { EtudiantAfterSchema } from '@/actions/auth/schemas';
import { SelectScrollable } from './SelectScrollable';
import { FaGraduationCap } from 'react-icons/fa';
import { RiGovernmentLine } from 'react-icons/ri';
import { MdOutlineClass } from 'react-icons/md';

interface ProfFormProps {
  handleRole: (role: string) => void;
}

export default function EtudiantAfterGoogleForm({ handleRole }: ProfFormProps) {
  const [role, setRole] = useState<string>('STUDENT');

  const form = useForm<z.infer<typeof EtudiantAfterSchema>>({
    resolver: zodResolver(EtudiantAfterSchema),
    defaultValues: {
      government: '',
      etablissement: '',
      classe: '',
    },
  });
  const govOptions = [
    { id: 1, value: 'tunis', label: 'Tunis' },
    { id: 1, value: 'sousse', label: 'Sousse' },
    { id: 1, value: 'beja', label: 'Beja' },
  ];
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (values: z.infer<typeof EtudiantAfterSchema>) => {
    values.role = role;
    // startTransition(() => {
    //   updateTeacherAfterGoogle(values).then((data) => {
    //     setError(data.error);
    //     setSuccess(data.success);
    //   });
    // });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
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
            name="government"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Gouvernorat<span className="text-red"> *</span>
                </FormLabel>
                <FormControl className="flex-grow ">
                  <SelectScrollable
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
            name="classe"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Classe<span className="text-red"> *</span>
                </FormLabel>
                <FormControl className="flex-grow ">
                  <SelectScrollable
                    field={field}
                    placeholder={'Sélectionnez votre classe'}
                    options={govOptions}
                    icon={<MdOutlineClass className="text-gray w-5 h-5" />}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button className="bg-[#99c6d3] font-semibold w-full h-12 pt-3 items-start justify-center rounded-lg text-center text-white text-base hover:opacity-75">
          Suivant
        </Button>
      </form>
    </Form>
  );
}
