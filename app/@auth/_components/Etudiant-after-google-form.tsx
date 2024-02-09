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
import { EtudiantAfterSchema } from '@/actions/auth/schemas';
import { SelectScrollable } from '../../../components/modals/SelectScrollable';
import { FaGraduationCap } from 'react-icons/fa';
import { RiGovernmentLine } from 'react-icons/ri';
import { MdOutlineClass } from 'react-icons/md';
import { useQuery } from '@tanstack/react-query';
import { getAllEstabs } from '@/actions/establishements';
import { Tunisiangovernments } from '@/public/auth/data/TunisianGovernments';
import { getClassesByEstablishmentId } from '@/actions/classe';
import { updateStudentAfterGoogle } from '@/actions/auth/updateStudentAfterGoogle';
import { useRouter } from 'next/navigation';
import FormError from '@/components/ui/form-error';
import FormSuccess from '@/components/ui/form-success';
import Select from 'react-select';

interface ProfFormProps {
  handleRole: (role: string) => void;
  session: any;
}

export default function EtudiantAfterGoogleForm({ handleRole, session }: ProfFormProps) {
  const [role, setRole] = useState<string>('STUDENT');
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [userEstab, setUserEstab] = useState<any>([]);
  const [isChooseEstab, setChooseEstab] = useState<boolean>(true);
  const [estabClassesOptions, setEstabClassesOptions] = useState([]);
  const [isRegistrationSuccessful, setRegistrationSuccessful] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof EtudiantAfterSchema>>({
    resolver: zodResolver(EtudiantAfterSchema),
    defaultValues: {
      government: '',
      etablissement: [],
    },
  });
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

  const govOptions = Tunisiangovernments;

  const [isTransPending, startTransition] = useTransition();

  const handleEtablissementChange = async (selectedEtablissement: any) => {
    form.setValue('etablissement', [selectedEtablissement], {
      shouldValidate: true,
    });
  };

  const formData = form.getValues();

  const onSubmit = async (values: z.infer<typeof EtudiantAfterSchema>) => {
    values.role = role;
    values.email = session?.email;
    setUserEstab(values.etablissement);
    setError('');
    setSuccess('');
    startTransition(() => {
      updateStudentAfterGoogle(values).then((data: any) => {
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
        console.error(error);
      }
    }
  }, [isRegistrationSuccessful, router, userEstab]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        <FormError message={error} />
        <FormSuccess message={success} />
        <div
          id="ButtonsRoot"
          className="bg-12 flex flex-row gap-4 w-full cursor-pointer  items-start pt-2 px-1 rounded-[50px]"
        >
          <div
            id="Buttons"
            className={`text-center text-xl font-semibold capitalize text-white flex flex-row mb-[5px] mt-[-2px] w-1/2 h-12 items-start justify-center pt-2 rounded-[50px] ${
              role === 'TEACHER' ? 'bg-2 ' : ''
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
            className={`text-center text-xl font-semibold capitalize text-white flex flex-row mb-[5px] mt-[-2px] w-1/2 h-12 items-start justify-center pt-2 rounded-[50px] ${
              role === 'STUDENT' ? 'bg-2 ' : ''
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
                    placeholder={'Choisissez vos/votre gouvernorat(s)'}
                    options={govOptions}
                    icon={<RiGovernmentLine className="text-muted-foreground w-5 h-5" />}
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
                  <Select
                    options={estabOptions}
                    isDisabled={isTransPending || estabPending}
                    onChange={(selectedOption: any) => handleEtablissementChange(selectedOption)}
                    placeholder={
                      <div className="flex items-center text-gray text-sm ">
                        <FaGraduationCap className="text-gray w-5 h-5 mr-2" />
                        Choisissez votre établissement
                      </div>
                    }
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
                      indicatorSeparator: (provided, state) => ({
                        ...provided,
                        display: 'none',
                      }),
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          disabled={isTransPending}
          className={`${
            form.formState.isValid ? 'bg-2' : 'bg-[#99c6d3]'
          } font-semibold w-full h-12 pt-3 items-start justify-center rounded-lg text-center text-white text-base hover:opacity-75`}
        >
          {isTransPending ? 'Enregistrement en cours...' : 'Suivant'}
        </Button>
      </form>
    </Form>
  );
}
