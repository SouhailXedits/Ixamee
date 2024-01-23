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
import { SelectScrollable } from './SelectScrollable';
import { FaGraduationCap } from 'react-icons/fa';
import { RigovernmentLine } from 'react-icons/ri';
import { MdOutlineClass } from 'react-icons/md';
// import { updateStudentAfterGoogle } from '@/actions/auth/updateStudentAfterGoogle';
import { useQuery } from '@tanstack/react-query';
import { getAllEstabs } from '@/actions/establishements';
import { Tunisiangovernments } from '@/public/auth/data/Tunisiangovernments';
import { TunisianClasses } from '@/public/auth/data/TunisianClasses';
import { getClassesByEstablishmentId } from '@/actions/classe';
import { updateStudentAfterGoogle } from '@/actions/auth/updateStudentAfterGoogle';
import { useRouter } from 'next/navigation';
import FormError from '@/components/ui/form-error';
import FormSuccess from '@/components/ui/form-success';

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
      classe: [],
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

  const govOptions = Tunisiangovernments;

  const classOptions = TunisianClasses;

  const [isTransPending, startTransition] = useTransition();

  const handleEtablissementChange = async (selectedEtablissement: any) => {
    setChooseEstab(true);

    form.setValue('etablissement', [selectedEtablissement], {
      shouldValidate: true,
    });

    if (selectedEtablissement.id) {
      try {
        const { data: estabClasses } = await getClassesByEstablishmentId(selectedEtablissement.id);
        setChooseEstab(false);

        const newOptions = [
          {
            id: estabClasses.id,
            value: estabClasses.name,
            label: estabClasses.name,
          },
        ] as any;
        setEstabClassesOptions(newOptions);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    }
  };
  const handleClasseChange = async (selectedClasse: any) => {
    form.setValue('classe', [selectedClasse], {
      shouldValidate: true,
    });
  };

  const onSubmit = async (values: z.infer<typeof EtudiantAfterSchema>) => {
    values.role = role;
    values.email = session?.email;
    console.log(values);
    setUserEstab(values.etablissement);
    setError('');
    setSuccess('');
    startTransition(() => {
      updateStudentAfterGoogle(values).then((data) => {
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
  }, [isRegistrationSuccessful, router, userEstab]);

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
                    icon={<RigovernmentLine className="text-muted-foreground w-5 h-5" />}
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
                    disabled={isTransPending}
                    field={field}
                    placeholder="Choisissez votre établissement"
                    options={estabOptions}
                    icon={<FaGraduationCap className="text-muted-foreground w-5 h-5" />}
                    onChange={(selectedOption: any) => handleEtablissementChange(selectedOption)}
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
                    disabled={isTransPending || isChooseEstab}
                    field={field}
                    placeholder="Sélectionnez votre classe"
                    options={estabClassesOptions}
                    icon={<MdOutlineClass className="text-muted-foreground w-5 h-5" />}
                    onChange={(selectedOption: any) => handleClasseChange(selectedOption)}
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
            form.formState.isValid ? 'bg-[#1B8392]' : 'bg-[#99c6d3]'
          } font-semibold w-full h-12 pt-3 items-start justify-center rounded-lg text-center text-white text-base hover:opacity-75`}
        >
          Suivant
        </Button>
      </form>
    </Form>
  );
}
