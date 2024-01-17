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
import { useEffect, useState } from 'react';
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
import { getAllSubjects } from '@/actions/subjects';
import { getAllEstabs } from '@/actions/establishements';
import { Skeleton } from '@/components/ui/skeleton';
import Select from 'react-select';
import { useRouter } from 'next/navigation';
interface ProfFormProps {
  handleRole: (role: string) => void;
  session: object;
}

export default function ProfAfterGoogleForm({ handleRole, session }: ProfFormProps) {
  const [role, setRole] = useState<string>('TEACHER');
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [userEstab, setUserEstab] = useState<object | undefined>([]);
  const [isRegistrationSuccessful, setRegistrationSuccessful] = useState<boolean>(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof ProfAfterSchema>>({
    resolver: zodResolver(ProfAfterSchema),
    defaultValues: {
      subject: [],
      etablissement: [],
      systeme: '',
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

  const systeme = [
    { id: 1, value: 'TRIMESTRE', label: 'Trimestre' },
    { id: 2, value: 'SEMESTRE', label: 'Semestre' },
    { id: 3, value: 'LIBRE', label: 'Libre' },
  ];
  const [isTransPending, startTransition] = useTransition();

  const onSubmit = async (values: z.infer<typeof ProfAfterSchema>) => {
    values.role = role;
    values.email = session?.email;
    setError('');
    setSuccess('');
    setUserEstab(values.etablissement);
    startTransition(() => {
      updateTeacherAfterGoogle(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
        if (data?.success) {
          setRegistrationSuccessful(true);
        }
      });
    });
  };

  useEffect(() => {
    if (isRegistrationSuccessful) {
      try {
        router.push(`/${userEstab[0].id}`);
        router.refresh();
      } catch (error) {
        console.log(error);
      }
    }
  }, [isRegistrationSuccessful, router,userEstab]);
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
                  {estabPending ? (
                    <Skeleton className="w-full h-[40px]" />
                  ) : (
                    <Select
                      isMulti
                      name="estab"
                      options={estabOptions}
                      placeholder={
                        <div className="flex items-center text-gray text-sm ">
                          <FaGraduationCap className="text-gray w-5 h-5 mr-2" />
                          Choisissez votre établissement
                        </div>
                      }
                      isSearchable={true}
                      styles={{
                        control: (provided, state) => ({
                          ...provided,
                          borderColor: '#e0e2e6',
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
                      }}
                      value={estabOptions.filter((option: any) =>
                        field.value.some((selectedOption) => selectedOption.id === option.id)
                      )}
                      onChange={(selectedOptions) => field.onChange(selectedOptions)}
                    />
                  )}
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
                  {estabPending ? (
                    <Skeleton className="w-full h-[40px]" />
                  ) : (
                    <Select
                      isMulti
                      name="matiere"
                      options={subjectOptions}
                      placeholder={
                        <div className="flex items-center text-gray text-sm ">
                          <MdOutlineClass className="text-gray w-5 h-5 mr-2" />
                          Choisissez votre établissement
                        </div>
                      }
                      isSearchable={true}
                      className="border-input "
                      styles={{
                        control: (provided, state) => ({
                          ...provided,
                          borderColor: '#e0e2e6',
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
                      }}
                      value={subjectOptions.filter((option: any) =>
                        field.value.some((selectedOption) => selectedOption.id === option.id)
                      )}
                      onChange={(selectedOptions) => field.onChange(selectedOptions)}
                    />
                  )}
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
                  {estabPending ? (
                    <Skeleton className="w-full h-[40px]" />
                  ) : (
                    <SelectScrollable
                      disabled={isTransPending}
                      field={field}
                      placeholder={'Choisissez votre système pédagogique'}
                      options={systeme}
                      icon={<MdOutlineTimer className="text-gray w-5 h-5" />}
                    />
                  )}
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
          } font-semibold w-full h-12 pt-3 items-start justify-center rounded-lg text-center text-white text-base hover:opacity-75`}
        >
          Suivant
        </Button>
      </form>
    </Form>
  );
}
