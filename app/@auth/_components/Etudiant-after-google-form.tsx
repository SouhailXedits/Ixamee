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
import { updateStudentAfterGoogle } from '@/actions/auth/updateStudentAfterGoogle';
import { useQuery } from '@tanstack/react-query';
import { getAllGovernments } from '@/actions/government';
import { getAllEstabs } from '@/actions/establishements';

interface ProfFormProps {
  handleRole: (role: string) => void;
  session: object;
}

export default function EtudiantAfterGoogleForm({ handleRole, session }: ProfFormProps) {
  const [role, setRole] = useState<string>('STUDENT');
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  // const session = await auth();
  const form = useForm<z.infer<typeof EtudiantAfterSchema>>({
    resolver: zodResolver(EtudiantAfterSchema),
    defaultValues: {
      government: '',
      etablissement: '',
      classe: '',
    },
  });
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

  const govOptions = [
    { id: 1, value: 'Tunis', label: 'Tunis' },
    { id: 2, value: 'Ariana', label: 'Ariana' },
    { id: 3, value: 'Ben Arous', label: 'Ben Arous' },
    { id: 4, value: 'Manouba', label: 'Manouba' },
    { id: 5, value: 'Nabeul', label: 'Nabeul' },
    { id: 6, value: 'Zaghouan', label: 'Zaghouan' },
    { id: 7, value: 'Bizerte', label: 'Bizerte' },
    { id: 8, value: 'Beja', label: 'Beja' },
    { id: 9, value: 'Jendouba', label: 'Jendouba' },
    { id: 10, value: 'Le Kef', label: 'Le Kef' },
    { id: 11, value: 'Siliana', label: 'Siliana' },
    { id: 12, value: 'Kairouan', label: 'Kairouan' },
    { id: 13, value: 'Kasserine', label: 'Kasserine' },
    { id: 14, value: 'Sidi Bouzid', label: 'Sidi Bouzid' },
    { id: 15, value: 'Gabes', label: 'Gabes' },
    { id: 16, value: 'Medenine', label: 'Medenine' },
    { id: 17, value: 'Tataouine', label: 'Tataouine' },
    { id: 18, value: 'Gafsa', label: 'Gafsa' },
    { id: 19, value: 'Tozeur', label: 'Tozeur' },
    { id: 20, value: 'Kebili', label: 'Kebili' },
    { id: 21, value: 'Sousse', label: 'Sousse' },
    { id: 22, value: 'Monastir', label: 'Monastir' },
    { id: 23, value: 'Mahdia', label: 'Mahdia' },
    { id: 24, value: 'Sfax', label: 'Sfax' },
  ];

  const classOptions = [
    { id: 1, label: '7eme année', value: '7eme année' },
    { id: 2, label: '8eme année', value: '8eme année' },
    { id: 3, label: '9eme année', value: '9eme année' },
    { id: 4, label: '1ère année', value: '1ère année' },
    { id: 5, label: '2ème année', value: '2ème année' },
    { id: 6, label: '3ème année', value: '3ème année' },
    { id: 10, label: 'Bac informatique', value: 'Bac informatique' },
    { id: 11, label: 'Bac technique', value: 'Bac technique' },
    { id: 12, label: 'Bac science', value: 'Bac science' },
    { id: 13, label: 'Bac lettre', value: 'Bac lettre' },
    { id: 14, label: 'Bac math', value: 'Bac math' },
    { id: 15, label: 'Bac sport', value: 'Bac sport' },
  ];

  const [isTransPending, startTransition] = useTransition();

  const onSubmit = async (values: z.infer<typeof EtudiantAfterSchema>) => {
    values.role = role;
    console.log(values);

    setError('');
    setSuccess('');
    startTransition(() => {
      updateStudentAfterGoogle(values).then((data) => {
        setError(data?.error);
        // setSuccess(data?.success);
      });
    });
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
                    disabled={isTransPending}
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
                    disabled={isTransPending || estabPending}
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

        <Button
          disabled={isTransPending}
          className={`${
            form.formState.isValid ? 'bg-[#1B8392]' : 'bg-[#99c6d3]'
          }font-semibold w-full h-12 pt-3 items-start justify-center rounded-lg text-center text-white text-base hover:opacity-75`}
        >
          Suivant
        </Button>
      </form>
    </Form>
  );
}
