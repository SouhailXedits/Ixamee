import React, { startTransition, useEffect, useState, useTransition } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import FormError from '@/components/ui/form-error';
import { VerifSchema } from '@/actions/auth/schemas';
import { CodeInput } from './CodeInput';
import bcryptjs from 'bcryptjs';
import { sendPasswordResetToken } from '@/actions/auth/sendPasswordResetToken';
import Link from 'next/link';
import { renvoyer } from '@/actions/auth/renvoyer-email';
import FormSuccess from '@/components/ui/form-success';
interface VerificationData {
  email?: string;
  code?: number;
}
const VerificationCodeForm: React.FC = ({ email, code }: VerificationData) => {
  const [codeValues, setCodeValues] = useState(['', '', '', '', '', '']);
  const currentTimestamp = new Date().getTime();
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [isCodeCorrect, setIsCodeCorrect] = useState<boolean | undefined>(undefined);
  const [error, setError] = useState<string | undefined>('');
  const [seccess, setSuccess] = useState<string | undefined>('');

  const form = useForm<z.infer<typeof VerifSchema>>({
    resolver: zodResolver(VerifSchema),
    defaultValues: {
      code: '',
    },
  });

  const handleCodeChange = (index: number, value: string) => {
    const newCodeValues = [...codeValues];
    newCodeValues[index] = value;
    setCodeValues(newCodeValues);
    setIsCodeValid(newCodeValues.every((code) => code.length === 1));
  };
  const [isTransPending, startTransition] = useTransition();
  const getVerificationCode = () => {
    return codeValues.join('');
  };
  const onSubmit = async () => {
    setError('');
    setSuccess('');
    try {
      const verificationCode = getVerificationCode();
      const storedVerificationData = JSON.parse(localStorage.getItem('email-verification') || '{}');
      if (codeValues) {
        const codeMatch = await bcryptjs.compare(verificationCode, storedVerificationData.code);

        if (email && codeMatch) {
          const expirationTimestamp = storedVerificationData.expiredAt;

          if (expirationTimestamp && currentTimestamp < expirationTimestamp) {
            setIsCodeCorrect(true);
            startTransition(() => {
              sendPasswordResetToken(storedVerificationData.email);
            });
          } else {
            setIsCodeCorrect(false);
            setError('Code expiré. Réessayez.');
          }
        } else {
          setIsCodeCorrect(false);
          setError('Code incorrect. Réessayez.');
        }
      }
    } catch (error) {
      setError("Quelque chose s'est mal passé");
    }
  };
  const handleResendVerificationEmail = async () => {
    setSuccess('');
    setError('');
    startTransition(async () => {
      if (email && code) {
        renvoyer(email, 'reset-password').then((data) => {
          setError(data.error);
          setSuccess(data.success);
          const hashedCode = data.hashedCode;

          const expirationTimestamp = currentTimestamp + 1 * 60 * 1000;
          localStorage.setItem(
            'email-verification',
            JSON.stringify({
              email: email,
              code: hashedCode,
              expiredAt: expirationTimestamp,
            })
          );
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form className="space-y-6 w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <FormError message={error} />
        <FormSuccess message={seccess} />
        <div className="flex mb-2 gap-2 rtl:space-x-reverse justify-between">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <CodeInput
              key={index}
              id={`code-${index}`}
              prevId={`code-${index - 1}`}
              nextId={`code-${index + 1}`}
              value={codeValues[index - 1]}
              onChange={(value) => handleCodeChange(index - 1, value)}
              isValid={isCodeCorrect}
            />
          ))}
        </div>
        <Button
          type="submit"
          disabled={isTransPending}
          className={`${
            isCodeValid ? 'bg-[#1B8392]' : 'bg-[#99c6d3]'
          } font-semibold w-full h-12 pt-3 items-start justify-center rounded-lg text-center text-white text-base hover:opacity-75`}
        >
          Vérifier
        </Button>
        <div className="flex flex-col gap-3 w-full items-center  gap-x-2">
          <div className="flex ">
            <p className="text-center text-[#727272] ">Vous n&apos;avez pas reçu le code? </p>
            &nbsp;
            <Link
              className="text-center text-[#1b8392] hover:underline font-semibold"
              href={''}
              onClick={handleResendVerificationEmail}
            >
              Renvoyez
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default VerificationCodeForm;
