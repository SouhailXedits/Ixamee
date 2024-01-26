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
import TnFlag from './TnFlag';
import { RegisterProfSchema } from '@/actions/auth/schemas';
import { register } from '@/actions/auth/registerProf';
import { SelectScrollable } from './SelectScrollable';
import { generateSixDigitNumber } from '@/actions/auth/codeGenerator';
import bcryptjs from 'bcryptjs';
import { sendEmailVerificationToken } from '@/actions/auth/sendEmailVerificationToken';
import { Tunisiangovernments } from '@/public/auth/data/TunisianGovernments';

interface ProfFormProps {
  handleRole: (role: string) => void;
}

export default function ProfForm({ handleRole }: ProfFormProps) {
  const [role, setRole] = useState<string>('TEACHER');
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const form = useForm<z.infer<typeof RegisterProfSchema>>({
    resolver: zodResolver(RegisterProfSchema),
    defaultValues: {
      role: '',
      nom: '',
      prenom: '',
      email: '',
      phone: '',
      government: '',
      password: '',
    },
  });
  const [showPassword, setShowPassword] = useState(false);

  const govOptions = Tunisiangovernments;

  const [isTransPending, startTransition] = useTransition();

  const onSubmit = async (values: z.infer<typeof RegisterProfSchema>) => {
    values.role = role;
    setError('');
    setSuccess('');
    startTransition(async () => {
      let code = generateSixDigitNumber();
      const hashedCode = await bcryptjs.hash(code + '', 10);
      register(values, code).then((data) => {
        setError(data.error);
        setSuccess(data.success);
        localStorage.setItem(
          'new-verification',
          JSON.stringify({
            email: values.email,
            code: hashedCode,
            password: values.password,
            rememberMe: true,
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

        <div className="flex flex-row w-full gap-4 max-xs:flex-col">
          <div className="w-full">
            <FormField
              control={form.control}
              name="nom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" whitespace-nowrap">
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="whitespace-nowrap	">
                    Numéro de téléphone<span className="text-red"> *</span>
                  </FormLabel>
                  <FormControl className="relative">
                    <Input
                      {...field}
                      placeholder="+216 00 000 000"
                      type="tel"
                      icon={<TnFlag width={20} height={20} className="" />}
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
        </div>

        <Button
          disabled={isTransPending}
          className={`${
            form.formState.isValid ? 'bg-2' : 'bg-12'
          } font-semibold w-full h-12 pt-3 items-start justify-center rounded-lg text-center text-white text-base hover:opacity-75`}
        >
          S&apos;inscrire
        </Button>
      </form>
    </Form>
  );
}
