import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, Button } from '@/components/ui';
import FormError from '@/components/ui/form-error';
import FormSuccess from '@/components/ui/form-success';
import CodeInput from '../../../components/modals/CodeInput';
import { sendPasswordResetToken } from '@/actions/auth/sendPasswordResetToken';
import { renvoyer } from '@/actions/auth/renvoyer-email';
import Link from 'next/link';

const VerifSchema = z.object({
  code: z.string().length(6),
});

interface VerificationData {
  email?: string | undefined;
  code?: string | undefined;
}

const VerificationCodeForm: React.FC<VerificationData> = ({ email, code }) => {
  const [codeValues, setCodeValues] = useState(['', '', '', '', '', '']);
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [expirationTimestamp, setExpirationTimestamp] = useState(0);

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

  const getVerificationCode = () => {
    return codeValues.join('');
  };

  const onSubmit = async () => {
    setError('');
    setSuccess('');

    if (email && isCodeValid) {
      const verificationCode = getVerificationCode();

      try {
        const codeMatch = await bcryptjs.compare(verificationCode, code!);

        if (codeMatch && expirationTimestamp > Date.now()) {
          setSuccess('Code vérifié avec succès');
          sendPasswordResetToken(email);
        } else {
          setError('Code expiré ou incorrect');
        }
      } catch (error) {
        setError('Une erreur est survenue');
      }
    } else {
      setError('Veuillez entrer un code valide');
    }
  };

  const handleResendVerificationEmail = async () => {
    setSuccess('');
    setError('');

    if (email && code) {
      renvoyer(email, '').then((data) => {
        setError(data.error);
        setSuccess(data.success);

        if (data.hashedCode && data.expirationTimestamp) {
          const hashedCode = data.hashedCode;
          const newExpirationTimestamp = Date.now() + 1 * 60 * 1000;

          setExpirationTimestamp(newExpirationTimestamp);
          localStorage.setItem(
            'email-verification',
            JSON.stringify({
              email: email,
              code: hashedCode,
              expiredAt: newExpirationTimestamp,
            })
          );
        }
      });
    }
  };

  useEffect(() => {
    const storedVerificationData = JSON.parse(localStorage.getItem('email-verification') || '{}');

    if (storedVerificationData.email && storedVerificationData.expiredAt) {
      setExpirationTimestamp(storedVerificationData.expiredAt);
    }
  }, []);

  return (
    <Form {...form}>
      <form className="w-full space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormError message={error} />
        <FormSuccess message={success} />
        <div className="flex justify-between gap-2 mb-2 rtl:space-x-reverse">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <CodeInput
              key={index}
              id={`code-${index}`}
              prevId={`code-${index - 1}`}
              nextId={`code-${index + 1}`}
              value={codeValues[index - 1]}
              onChange={(value) => handleCodeChange(index - 1, value)}
              isValid={isCodeValid}
            />
          ))}
        </div>
        <Button
          type="submit"
          disabled={!isCodeValid}
          className={`${
            isCodeValid ? 'bg-2' : 'bg-12'
          } font-semibold w-full h-12 pt-3 items-start justify-center rounded-lg text-center text-white text-base hover:opacity-75`}
        >
          {isCodeValid ? 'Vérifier' : 'Code invalide'}
        </Button>
        <div className="flex flex-col items-center w-full gap-3 gap-x-2">
          <div className="flex ">
            <p className="text-center text-[#727272] ">Vous n&apos;avez pas reçu le code? </p>
            &nbsp;
            <Link
              className="font-semibold text-center text-2 hover:underline"
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
