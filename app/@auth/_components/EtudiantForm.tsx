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
import Select from 'react-select';
import { register } from '@/actions/auth/registerEtudiant';
import { SelectScrollable } from './SelectScrollable';
import { MdOutlineClass } from 'react-icons/md';
import { FaGraduationCap } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { getAllEstabs } from '@/actions/establishements';
import { Tunisiangovernments } from '@/public/auth/data/TunisianGovernments';
import { getClassesByEstablishmentId } from '@/actions/classe';
import bcryptjs from 'bcryptjs';
import { sendEmailVerificationToken } from '@/actions/auth/sendEmailVerificationToken';
import { generateSixDigitNumber } from '@/actions/auth/codeGenerator';
import { RiGovernmentLine } from 'react-icons/ri';

interface ProfFormProps {
  handleRole: (role: string) => void;
}

export default function EtudiantForm({ handleRole }: ProfFormProps) {
  const [role, setRole] = useState<string>('STUDENT');
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isChooseEstab, setChooseEstab] = useState<boolean>(true);
  const [estabClassesOptions, setEstabClassesOptions] = useState([]);

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
      etablissement: [],
      classe: [],
    },
  });
  const formData = form.getValues();
  const [showPassword, setShowPassword] = useState(false);
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
    setChooseEstab(true);

    form.setValue('etablissement', [selectedEtablissement], {
      shouldValidate: true,
    });

    if (selectedEtablissement.id) {
      try {
        const { data: estabClasses } = await getClassesByEstablishmentId(selectedEtablissement.id);
        setChooseEstab(false);
        const newOptions =
          (estabClasses &&
            estabClasses.map((estab: any) => {
              return { id: estab.id, value: estab.name, label: estab.name };
            })) ||
          [];
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

  const onSubmit = async (values: z.infer<typeof RegisterEtudSchema>) => {
    values.role = role;
    setError('');
    setSuccess('');
    startTransition(() => {
      let code = generateSixDigitNumber();
      register(values, code).then(async (data: any) => {
        setError(data.error);
        setSuccess(data.success);
        const hashedCode = await bcryptjs.hash(code + '', 10);
        localStorage.setItem(
          'new-verification',
          JSON.stringify({
            email: values.email,
            code: hashedCode,
            password: values.password,
            rememberMe: true,
            role,
          })
        );
        if (data.success && !data.error) {
          sendEmailVerificationToken(values.email);
        }
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
          className="bg-12 flex flex-row gap-4 w-full cursor-pointer  items-start pt-2 px-1 rounded-[50px]"
        >
          <div
            id="Buttons"
            className={`text-center text-xl font-semibold capitalize text-white flex flex-row mb-2 w-1/2 h-12 items-start justify-center pt-2 px-4 rounded-[50px] ${
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
            className={`text-center text-xl font-semibold capitalize text-white flex flex-row mt-px w-1/2 h-12 items-start justify-center pt-2 px-4 rounded-[50px] ${
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
                      icon={<LucidePencil className="text-muted-foreground w-5 h-5" />}
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
                      icon={<LucidePencil className="text-muted-foreground w-5 h-5" />}
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
                      icon={<MdOutlineEmail className="text-muted-foreground w-5 h-5" />}
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
                      disabled={isTransPending}
                      field={field}
                      placeholder={'Choisissez votre gouvernorat'}
                      options={govOptions}
                      icon={<RiGovernmentLine className="text-muted-foreground w-5 h-5" />}
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
                    <Select
                      isMulti={false}
                      options={estabClassesOptions}
                      isDisabled={formData.etablissement.length == 0 || isTransPending}
                      placeholder={
                        <div className="flex items-center text-gray text-sm ">
                          <MdOutlineClass className="text-gray w-5 h-5 mr-2" />
                          Sélectionnez votre classe
                        </div>
                      }
                      onChange={(selectedOption: any) => handleClasseChange(selectedOption)}
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
                      icon={<IoKeyOutline className="text-muted-foreground w-5 h-5" />}
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
                    Vérification du mot de passe<span className="text-red"> *</span>
                  </FormLabel>
                  <FormControl className="relative">
                    <Input
                      {...field}
                      placeholder="Vérifiez le mot de passe"
                      type={showPassword ? 'text' : 'password'}
                      icon={<IoKeyOutline className="text-muted-foreground w-5 h-5" />}
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
          className={`${
            form.formState.isValid ? 'bg-2' : 'bg-[#99c6d3]'
          } font-semibold w-full h-12 pt-3 items-start justify-center rounded-lg text-center text-white text-base hover:opacity-75`}
        >
          {isTransPending ? 'Inscription en cours...' : "S'inscrire"}
        </Button>
      </form>
    </Form>
  );
}
